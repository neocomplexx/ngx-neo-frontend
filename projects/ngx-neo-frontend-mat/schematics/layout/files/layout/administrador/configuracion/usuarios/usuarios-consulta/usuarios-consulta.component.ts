import { Component, OnInit } from '@angular/core';
import { NeoComponentAsync, AuthChangePasswordRequestDTO } from '@neocomplexx/ngx-neo-frontend-mat';
import { BehaviorSubject } from 'rxjs';
import { ICommand, Command } from '@neocomplexx/ngx-neo-directives-mat';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../usuarios.service';
import { UsuarioConsultaModel } from './usuarios-consulta.model';
import { UsuarioBasicConsultaModel } from './usuario-basic-consulta.model';
import { NgxNeoModalMatService, AlertButton } from '@neocomplexx/ngx-neo-modal-mat';
import { MatDialog } from '@angular/material/dialog';
import { UserRefreshPasswordComponent } from '../usuario-refresh-password/user-refresh-password.component';
import { UserRefreshPasswordModel } from '../usuario-refresh-password/user-refresh-password.component.model';
import { HeaderUaalooService } from 'src/app/core/header-uaaloo/header-uaaloo.service';


@Component({
  selector: 'app-configuracion-usuario',
  templateUrl: './usuarios-consulta.component.html'
})
export class UsuariosConsultaComponent extends NeoComponentAsync {

  // Modelo de usuarios
  public modeloUsuarios: Array<UsuarioBasicConsultaModel>;

  public indiceSeleccionado: number;
  public inputSearch: string;

  // Html material
  public displayedColumns: string[] = ['Usuario', 'Nombre', 'Rol asociado', ' '];

  // Command para editar un usuario
  public esValido: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public agregarCmd: ICommand = new Command(() => this.agregarUsuario(), this.esValido, false);
  public editarCmd: ICommand = new Command((value) => this.editarUsuario(value), this.esValido, true);
  public eliminarCmd: ICommand = new Command((value) => this.eliminarUsuario(value), this.esValido, true);
  public refreshPassCmd: ICommand = new Command((value) => this.refreshPass(value), this.esValido, false);

  // Campos de la tabla a completar
  public searchNombre: string;
  public searchRol: string;
  public searchUsuario: string;

  constructor(public configuracionUsuarioService: UsuariosService, public activeRoute: ActivatedRoute, public router: Router,
    public neoModalService: NgxNeoModalMatService,
    protected headerService: HeaderUaalooService,
    public dialog: MatDialog) {
    super(headerService);

    //  this.scrollSavedActivated = true;
  }

  async ngOnInitAsync(): Promise<void> {
    // obtengo el arreglo de usuarios
    this.indiceSeleccionado = this.configuracionUsuarioService.indice;
    this.modeloUsuarios = await this.configuracionUsuarioService.getUsersBasic();
  }

  public agregarUsuario(): void {
    this.router.navigate(['./usuarios-alta'], { relativeTo: this.activeRoute.parent });
  }

  public async editarUsuario(value: UsuarioConsultaModel): Promise<void> {
    this.configuracionUsuarioService.setUsuarioAEditar(value);
    this.configuracionUsuarioService.indice = this.modeloUsuarios.findIndex(x => x.Id === value.Id);
    this.router.navigate(['./usuarios-alta'], { relativeTo: this.activeRoute.parent });
  }

  /**
   * Elimino el usuario seleccionado
   * @param value id del usuario a eliminar
   */
  public async eliminarUsuario(value: UsuarioBasicConsultaModel): Promise<void> {
    const res = await this.neoModalService.decision('¿Está seguro que desea eliminar el usuario?');
    if (res.ButtonResponse === AlertButton.Accept) {
      await this.configuracionUsuarioService.deleteUser(value.Id);
      const index = this.modeloUsuarios.indexOf(value);
      if (index) {
        this.modeloUsuarios.splice(index, 1);
      }
    }
  }

  /** Actualizo la vista con los cambios realizados
   */
  public async actualizarVista(): Promise<void> {
    this.modeloUsuarios = await this.configuracionUsuarioService.getUsersBasic();
  }

  public async refreshPass(user: UsuarioConsultaModel): Promise<void> {
    const userRefreshPasswordModel: UserRefreshPasswordModel = new UserRefreshPasswordModel(new AuthChangePasswordRequestDTO());
    userRefreshPasswordModel.UserName = user.UserName;
    userRefreshPasswordModel.fullName = user.FullName;

    const dialogRef = this.dialog.open(UserRefreshPasswordComponent, {
      data: userRefreshPasswordModel,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      //  console.log('The dialog was closed');
      // this.animal = result;
    });

  }

}

