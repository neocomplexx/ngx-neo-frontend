
import { ElementRef, HostListener } from '@angular/core';
import { MenuModel } from './menu.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuGroupModel } from './menu-group.model';
import { BehaviorSubject } from 'rxjs';
import { MenuOptionsModel } from './menu-options.model';
import { Command } from '@neocomplexx/ngx-neo-directives-mat';

/**
 * Clase encargada de la creacion de menues para el sistema a partir de un archivo json
 * Para usarla simplemente extender esta clase, en el constructor del hijo usar super (router) y definir en data el json
 * de forma this.data = require('!./my-json.json');
 * luego llamar armarMenu() desde ngOnInit o el constructor.
 * @author jcangelosi
 */

export class NeoMenuComponent {

  public jsonMenuData;

  public menus: MenuModel[];

  constructor(protected activeRoute: ActivatedRoute, protected router: Router, protected _elementRef: ElementRef) {
    this.menus = new Array<MenuModel>();
  }

  /**
   * Metodo que se encarga del armado de menus basado en un json cargado con anterioridad.
   */
  protected armarMenu() {
    let i = 0;
    for (const grupo of this.jsonMenuData.grupos) {
      const grupoModel = new MenuGroupModel(i.toString());
      grupoModel.nombre = grupo.nombreGrupo;
      for (const opcion of grupo.opciones) {
        let behavior: BehaviorSubject<boolean> = new BehaviorSubject(true);
        if (opcion.disabled === '') {
          behavior = new BehaviorSubject(true);
        } else {
          behavior = this[opcion.disabled];
        }
        let comandoOpcion;
        if (opcion.param === '') {
          comandoOpcion = new Command(() => this.router.navigate([opcion.route], { relativeTo: this.activeRoute }), behavior, false);
        } else {
          comandoOpcion = new Command(() => this.router.navigate([opcion.route],
            {
              relativeTo: this.activeRoute,
              queryParams: { param1: opcion.param }
            }), behavior, false);
        }
        const opcionModel = new MenuOptionsModel();
        opcionModel.nombre = opcion.nombreOpcion;
        opcionModel.comando = comandoOpcion;
        opcionModel.id = opcion.nombreOpcion;
        opcionModel.descripcion = opcion.descripcionOpcion;
        opcionModel.featureName = opcion.featureName;
        grupoModel.agregarOpcion(opcionModel);
      }
      if (!this.menus[grupo.col]) {
        this.menus[grupo.col] = new MenuModel(grupo.col);
      }
      this.menus[grupo.col].agregarGrupo(grupoModel);
      i++;
    }
  }

  /**
   * Listener de teclas que permite utilizar el menu con el teclado
   * @param event evento del teclado que se captura para ver si se presiono una tecla que corresponde al menu
   * @author laguirre jcangelosi
   */
  @HostListener('window:keyup', ['$event']) hotkeys(event: KeyboardEvent) {

    if (event.keyCode >= 65 && event.keyCode <= 90) {

      let opcionesPosibles: Array<MenuOptionsModel> = new Array<MenuOptionsModel>();
      for (const menu of this.menus) {
        opcionesPosibles = opcionesPosibles.concat(menu.filtrarOpciones(event.keyCode));
      }

      if (opcionesPosibles.length > 0) {
        let i = 0;
        while (i < opcionesPosibles.length &&
          this._elementRef.nativeElement.querySelector('#' + opcionesPosibles[i].id) !== document.activeElement) {
            // .is(":focus")){
          i++;
        }

        if (i === opcionesPosibles.length) {
          this._elementRef.nativeElement.querySelector('#' + opcionesPosibles[0].id).focus();
        } else {
          this._elementRef.nativeElement.querySelector('#' + opcionesPosibles[(i + 1) % opcionesPosibles.length].id).focus();
        }
      } else {
        const primeraOpcion: MenuOptionsModel = this.menus[0].primeraOpcionHabilitada();
        if (primeraOpcion != null) {
          this._elementRef.nativeElement.querySelector('#' + primeraOpcion.id).focus();
        }
      }
    }
  }
}
