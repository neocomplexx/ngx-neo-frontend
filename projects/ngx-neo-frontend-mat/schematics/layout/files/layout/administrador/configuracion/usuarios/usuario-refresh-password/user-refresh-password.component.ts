import { Component, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICommand, Command } from '@neocomplexx/ngx-neo-directives-mat';
import { UserRefreshPasswordModel } from './user-refresh-password.component.model';
import { UsersServiceBackend } from '@neocomplexx/ngx-neo-frontend-mat';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UsuariosConsultaComponent } from '../usuarios-consulta/usuarios-consulta.component';
import { NgxNeoModalMatService } from '@neocomplexx/ngx-neo-modal-mat';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-ngbd-modal-component',
  templateUrl: './user-refresh-password.component.html'
})
export class UserRefreshPasswordComponent {
 // userRefreshPasswordModel: UserRefreshPasswordModel;

  // Commandas para aceptar y cancelar en el modal
  public aceptarCmd: ICommand = new Command(() => this.aceptar(), new BehaviorSubject(true), true);
  public cancelarCmd: ICommand = new Command(() => this.cancelar(), new BehaviorSubject(true), false);
  public blanquearClaveCmd: ICommand = new Command(() => this.blanquearClave(), new BehaviorSubject(true), true);

  public showPasswordError: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UsuariosConsultaComponent>,
    @Inject(MAT_DIALOG_DATA) public userRefreshPasswordModel: UserRefreshPasswordModel,
    public configuracionUsuarioService: UsuariosService, private usersServiceBackend: UsersServiceBackend,
    protected neoModalService: NgxNeoModalMatService) {
  }

  /**
   * Metodo llamado por el boton aceptar del modal, el cual clona el rol indicado
   * @author laguirre
   */
  public async aceptar(): Promise<void> {
    if (this.userRefreshPasswordModel.repeatPassword === this.userRefreshPasswordModel.Password) {
      await this.configuracionUsuarioService.refreshPassword(this.userRefreshPasswordModel.getEntityDTO());
      await this.neoModalService.success('La contraseña se ha cambiado con éxito.');
      this.dialogRef.close();
    } else {
      this.showPasswordError = true;
    }
  }

  /**
   * Boton cancelar del modal, el cual no realiza ninguna acción (solo cierra el modal)
   * @author bdilschneider
   */
  public cancelar(): void {
    this.dialogRef.close();
  }

  public async blanquearClave() {
    const a = isNaN(Number(this.userRefreshPasswordModel.UserName));
    await this.usersServiceBackend.deleteUsersUSERNAMEBlankPassword(this.userRefreshPasswordModel.UserName);
    if (isNaN(Number(this.userRefreshPasswordModel.UserName))) {
      await alert('La contraseña del usuario: ' + this.userRefreshPasswordModel.UserName +
        ' se ha reiniciado a 123456');
    } else {
      await alert('La contraseña del usuario: ' + this.userRefreshPasswordModel.UserName +
        ' se ha reiniciado');
    }
    this.dialogRef.close();
  }
}

