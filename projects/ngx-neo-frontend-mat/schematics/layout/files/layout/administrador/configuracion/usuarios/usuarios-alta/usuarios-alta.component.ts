import { Component, OnInit, OnDestroy } from '@angular/core';
import { NeoComponentAsync, RoleDTO, UserSearch, AuthNewUserRequestDTO, UserState, AuthEditUserRequestModelDTO, AuthEditUserRequestDTO, UserDTO } from '@neocomplexx/ngx-neo-frontend-mat';
import { UsuarioGeneracionModel } from './usuario-generacion.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ICommand, Command } from '@neocomplexx/ngx-neo-directives-mat';
import { CompleterItem } from '@neocomplexx/ngx-neo-completer-mat';
import { UsuariosService } from '../usuarios.service';
import { RolesService } from '../../roles/roles.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioConsultaModel } from '../usuarios-consulta/usuarios-consulta.model';
import { Header<%=classify(projectName)%>Service } from 'src/app/core/header-<%=dasherize(projectName)%>/header-<%=dasherize(projectName)%>.service';

@Component({
  selector: 'app-configuracion-usuario-alta',
  templateUrl: './usuarios-alta.component.html'
})
export class UsuariosAltaComponent extends NeoComponentAsync implements OnDestroy {
  
 // @ViewChild('contrasenia') contrasenia: ElementRef;

  // Modelo de generación de usuario
  public usuarioGeneracionModel: UsuarioGeneracionModel;
  public usuarioCargado: boolean;

  // Editar un usuario
  public usuarioAEditar: AuthEditUserRequestModelDTO;
  public idUsuarioAEditar: number;

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

  constructor(private configuracionUsuarioService: UsuariosService,
    private configuracionRolService: RolesService, public userSearch: UserSearch,
    protected headerService: Header<%=classify(projectName)%>Service,
    public activeRoute: ActivatedRoute, public router: Router) {
    super(headerService);
    this.usuarioGeneracionModel = new UsuarioGeneracionModel(new AuthNewUserRequestDTO());
    this.usuarioGeneracionModel.getEntityDTO().state = UserState.Active;
    this.usuarioActivo = true;
    this.usuarioCargado = false;
    this.habilitarCreacionPass = false;
    this.usuarioAEditar = new AuthEditUserRequestModelDTO(new AuthEditUserRequestDTO());
    this.idUsuarioAEditar = 0;

 /* this.headerService.beforeBack = (beforeBackArgs) => {
     // this.tabSelectedId.next('consulta');
      beforeBackArgs.cancelBack = true;
    };*/
  }

  async ngOnInitAsync(): Promise<void> { 

    this.roles = await this.configuracionRolService.getUsuariosrolesBasicos();

    const userToEdit: UsuarioConsultaModel = this.configuracionUsuarioService.getUsuarioAEditar();
    if (userToEdit) {
        const userToEditDTO: UserDTO = userToEdit.getEntityDTO();
        this.idUsuarioAEditar = userToEditDTO.id;
        this.usuarioGeneracionModel.FirstName = userToEditDTO.firstName;
        this.usuarioGeneracionModel.LastName = userToEditDTO.lastName;
      //  console.log(userToEdit);
        const rol = this.roles.find(x => x.name === userToEditDTO.roleName);
        if (rol) {
          this.usuarioGeneracionModel.IdRole = rol.id;
        }
        this.usuarioGeneracionModel.IdUserOwner = userToEditDTO.idUserOwner;
        this.usuarioGeneracionModel.UserName = userToEditDTO.userName;
        this.usuarioActivo = this.usuarioGeneracionModel.getEntityDTO().state === UserState.Active;
        if (userToEdit.IdUserOwner > 0) {
          const userDTO = await this.configuracionUsuarioService.getUser(userToEdit.IdUserOwner);
          this.usuarioSearchString = userDTO.UserName;
        } else {
          this.usuarioSearchString = '';
        }
        this.usuarioCargado = true;
        this.configuracionUsuarioService.setUsuarioAEditar(null);
    }

    this.changedSubscribe = this.usuarioGeneracionModel.changed.subscribe((changed) => { this.headerService.notifyChange(changed); });
    this.headerService.notifyChange(false);
  }

  ngOnDestroy(): void {
    //  this.cancelar();
     // this.headerService.destroyComponent();
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
    this.headerService.notifyChange(false);
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
    this.limpiarPantalla();
    this.headerService.closeComponent();
   // this.router.navigate(['./usuarios'], { relativeTo: this.activeRoute.parent});
  }

  /**
   * Edito un usuario existente en el sistema
   */
  public async editarUsuario(): Promise<void> {
    if (this.idUsuarioAEditar) {
      const userToEditDTO: AuthEditUserRequestDTO = this.usuarioGeneracionModel.getEntityDTO();
      this.usuarioAEditar.FirstName = userToEditDTO.firstName;
      this.usuarioAEditar.LastName = userToEditDTO.lastName;
      this.usuarioAEditar.IdRole = userToEditDTO.idRole;
      this.usuarioAEditar.IdUserOwner = userToEditDTO.idUserOwner;
      this.usuarioAEditar.UserName = userToEditDTO.userName;
      await this.configuracionUsuarioService.editUser( this.idUsuarioAEditar, this.usuarioAEditar.getEntityDTO());
      this.limpiarPantalla();
     // this.router.navigate(['./usuarios'], { relativeTo: this.activeRoute.parent});
      this.headerService.closeComponent();
    }
  }

  public cancelar(): void {
    this.headerService.notifyChange(false);
    this.limpiarPantalla();
    this.headerService.closeComponent();
  }

}
