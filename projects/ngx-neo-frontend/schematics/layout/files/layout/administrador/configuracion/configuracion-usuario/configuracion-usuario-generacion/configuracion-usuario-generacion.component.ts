import { Component, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { AuthNewUserRequestDTO } from '@neocomplexx/ngx-neo-frontend';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Command, ICommand } from '@neocomplexx/ngx-neo-directives';
import { NeoComponentAsync } from '@neocomplexx/ngx-neo-frontend';
import { UsuarioGeneracionModel } from './usuario-generacion.model';
import { UsuarioConsultaModel } from '../configuracion-usuario-consulta/usuario-consulta.model';
import { RoleDTO } from '@neocomplexx/ngx-neo-frontend';
import { ConfiguracionUsuarioService } from '../configuracion-usuario.service';
import { RoleModelDTO} from '@neocomplexx/ngx-neo-frontend';
import { ConfiguracionRolService } from '../../configuracion-rol/configuracion-rol.service';
import { UserSearch } from '@neocomplexx/ngx-neo-frontend';
import { CompleterItem } from '@neocomplexx/ngx-neo-completer';
import { UserState } from '@neocomplexx/ngx-neo-frontend';
import { Header<%=classify(projectName)%>Service } from 'src/app/core/header-<%=dasherize(projectName)%>/header-<%=dasherize(projectName)%>.service';

@Component({
  selector: 'app-configuracion-usuario-generacion',
  templateUrl: './configuracion-usuario-generacion.component.html'
})
export class ConfiguracionUsuarioGeneracionComponent extends NeoComponentAsync implements OnDestroy {
  
  @Input() tabSelectedId: BehaviorSubject<string>;
  @Input() idUsuario: BehaviorSubject<number>;
  @ViewChild('contrasenia') contrasenia: ElementRef;

  // Modelo de generación de usuario
  public usuarioGeneracionModel: UsuarioGeneracionModel;
  public usuarioCargado: boolean;

  // Command para generar un usuario
  public esValido: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public generarCmd: ICommand = new Command(() => this.generarUsuario(), this.esValido, true);

  // Command para editar un usuario
  public editarCmd: ICommand = new Command(() => this.editarUsuario(), this.esValido, true);
  public cancelarCmd: ICommand = new Command(() => this.cancelar(), this.esValido, false);

  // Arreglo de strings de usuarios para la vista
  public roles: Array<RoleDTO>;

  public habilitarCreacionPass: boolean;

  public usuarioSearchString: string;

  public changedSubscribe: Subscription;

  public usuarioActivo: boolean;

  constructor(private configuracionUsuarioService: ConfiguracionUsuarioService,
    private configuracionRolService: ConfiguracionRolService, public userSearch: UserSearch,
    protected headerService: Header<%=classify(projectName)%>Service) {
    super(headerService);
    this.usuarioGeneracionModel = new UsuarioGeneracionModel(new AuthNewUserRequestDTO());
    this.usuarioGeneracionModel.getEntityDTO().state = UserState.Active;
    this.usuarioActivo = true;
    this.usuarioCargado = false;
    this.habilitarCreacionPass = false;

    this.headerService.beforeBack = (beforeBackArgs) => {
      this.tabSelectedId.next('consulta');
      beforeBackArgs.cancelBack = true;
    };
  }

  async ngOnInitAsync(): Promise<void> {

    //  this.changedSubscribe = this.usuarioGeneracionModel.changed.subscribe((changed) => { this.headerService.notifyChange(changed); });

    if (this.idUsuario.getValue() !== 0) { // Se trata de la edicion de un usuario
      const user: UsuarioConsultaModel = await this.configuracionUsuarioService.getUser(this.idUsuario.getValue());
      this.usuarioGeneracionModel.FirstName = user.FirstName;
      this.usuarioGeneracionModel.LastName = user.LastName;
      this.usuarioGeneracionModel.UserName = user.UserName;
      this.usuarioGeneracionModel.State = user.State;
      this.usuarioGeneracionModel.IdRole = user.Role.id;
      this.usuarioActivo = this.usuarioGeneracionModel.getEntityDTO().state === UserState.Active;
      if (user.IdUserOwner > 0) {
        const userDTO = await this.configuracionUsuarioService.getUser(user.IdUserOwner);
        this.usuarioSearchString = userDTO.UserName;
      } else {
        this.usuarioSearchString = '';
      }
      this.usuarioCargado = true;
    }

    this.roles = await this.configuracionRolService.getUsuariosrolesBasicos();

    this.changedSubscribe = this.usuarioGeneracionModel.changed.subscribe((changed) => { this.headerService.notifyChange(changed); });
    this.headerService.notifyChange(false);
  }

  ngOnDestroy(): void {
    this.cancelar();
    this.headerService.destroyComponent();
    this.changedSubscribe.unsubscribe();
  }

  public isRoleNeedUserOwner(): boolean {
    if (this.roles) {
      const role = this.roles.find(x => x.id === this.usuarioGeneracionModel.IdRole);
      return role && role.needUserOwner;
    } else {
      return false;
    }
  }

  public toggleActivo() {
    this.usuarioGeneracionModel.getEntityDTO().state = this.usuarioActivo ? UserState.Inactive : UserState.Active;
    this.usuarioActivo = !this.usuarioActivo;
  }

  public limpiarPantalla(): void {
    this.usuarioGeneracionModel = new UsuarioGeneracionModel(new AuthNewUserRequestDTO());
    this.usuarioCargado = false;
  }

  public onUserOwnerSelected(item: CompleterItem) {
    this.usuarioGeneracionModel.IdUserOwner = item ? item.originalObject.id : 0;
  }

  /**
   * Genero un usuario en el sistema
   */
  public async generarUsuario(): Promise<void> {
    await this.configuracionUsuarioService.insertUser(this.usuarioGeneracionModel.getEntityDTO());
    this.cancelar();
  }

  /**
   * Edito un usuario existente en el sistema
   */
  public async editarUsuario(): Promise<void> {
    await this.configuracionUsuarioService.editUser(this.idUsuario.getValue(), this.usuarioGeneracionModel);
    this.cancelar();
  }

  public cancelar(): void {
    this.headerService.notifyChange(false);
    this.idUsuario.next(0);
    this.limpiarPantalla();
    this.tabSelectedId.next('consulta');

  }

}
