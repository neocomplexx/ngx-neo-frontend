import { Component, OnInit } from '@angular/core';
import { NeoComponentAsync, RoleModelDTO } from '@neocomplexx/ngx-neo-frontend-mat';
import { BehaviorSubject } from 'rxjs';
import { ICommand, Command } from '@neocomplexx/ngx-neo-directives-mat';
import { RolesService } from '../roles.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertButton, NgxNeoModalMatService } from '@neocomplexx/ngx-neo-modal-mat';
import { Header<%=classify(projectName)%>Service } from 'src/app/core/header-<%=dasherize(projectName)%>/header-<%=dasherize(projectName)%>.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles-consulta.component.html'
})
export class RolesConsultaComponent extends NeoComponentAsync {

  // Modelos de consulta de roles
  public rolesConsulta: Array<RoleModelDTO>;

  // Command para editar un rol
  public esValido: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public agregarCmd: ICommand = new Command(() => this.agregarRol(), this.esValido, false);
  public editarCmd: ICommand = new Command((value) => this.editarRol(value), this.esValido, true);

  // Campos de la tabla a completar
  public searchNombre: string;
  public searchDescripcion: string;

  // Html material
  public displayedColumns: string[] = ['Nombre', 'Descripcion', ' '];

  constructor(public configuracionRolService: RolesService, protected headerService: Header<%=classify(projectName)%>Service,
    public activeRoute: ActivatedRoute, public router: Router,
    private neoModalService: NgxNeoModalMatService
  ) {
    super(headerService);

    // this.scrollSavedActivated = true;

    this.rolesConsulta = new Array<RoleModelDTO>();
  }

  async ngOnInitAsync(): Promise<void> {
    // Traigo los roles del backend
    this.rolesConsulta = await this.configuracionRolService.getUsuariosroles();
  }

  public agregarRol(): void {
    this.router.navigate(['./roles-alta'], { relativeTo: this.activeRoute.parent });
  }

  /**
   * Manda a la pestaña generación para la edición del rol
   * @param value id del rol
   * @author bdilschneider
   */
  public async editarRol(value: RoleModelDTO): Promise<void> {
    this.configuracionRolService.setRolAEditar(value);
    this.router.navigate(['./roles-alta'], { relativeTo: this.activeRoute.parent });
  }



  /** Actualizo la vista con los cambios realizados
   * @author bdilschneider
   */
  public async actualizarVista(): Promise<void> {
    this.rolesConsulta = await this.configuracionRolService.getUsuariosroles();
  }
}

