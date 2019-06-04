import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { ICommand, Command } from '@neocomplexx/ngx-neo-directives';
import { UserRefreshPasswordModel } from './user-refresh-password.component.model';
import { ConfiguracionUsuarioService } from '../../configuracion-usuario.service';
import { UsersServiceBackend } from '@neocomplexx/ngx-neo-frontend';

@Component({
  selector: 'app-ngbd-modal-component',
  templateUrl: './user-refresh-password.component.html'
})
export class UserRefreshPasswordComponent {
  userRefreshPasswordModel: UserRefreshPasswordModel;

  // Commandas para aceptar y cancelar en el modal
  public aceptarCmd: ICommand = new Command(() => this.aceptar(), new BehaviorSubject(true), true);
  public cancelarCmd: ICommand = new Command(() => this.cancelar(), new BehaviorSubject(true), false);
  public blanquearClaveCmd: ICommand = new Command(() => this.blanquearClave(), new BehaviorSubject(true), true);

  public showPasswordError: boolean = false;

  constructor(public activeModal: NgbActiveModal,
    public configuracionUsuarioService: ConfiguracionUsuarioService, private usersServiceBackend: UsersServiceBackend) {
  }

  /**
   * Metodo llamado por el boton aceptar del modal, el cual clona el rol indicado
   * @author laguirre
   */
  public async aceptar(): Promise<void> {
    if (this.userRefreshPasswordModel.repeatPassword === this.userRefreshPasswordModel.Password) {
      await this.configuracionUsuarioService.refreshPassword(this.userRefreshPasswordModel.getEntityDTO());
      this.activeModal.close('Close click');
    } else {
      this.showPasswordError = true;
    }
  }

  /**
   * Boton cancelar del modal, el cual no realiza ninguna acción (solo cierra el modal)
   * @author bdilschneider
   */
  public cancelar(): void {
    this.activeModal.close('Close click');
  }

  public async blanquearClave() {
    const a = isNaN(Number(this.userRefreshPasswordModel.UserName));
    await this.usersServiceBackend.deleteUsersUSERNAMEBlankPassword(this.userRefreshPasswordModel.UserName);
    if (isNaN(Number(this.userRefreshPasswordModel.UserName))) {// Los username de los productores son numeros
      await alert('La contraseña del usuario: ' + this.userRefreshPasswordModel.UserName +
        ' se ha reiniciado a 123456');
    } else {
      await alert('La contraseña del usuario: ' + this.userRefreshPasswordModel.UserName +
        ' se ha reiniciado a su CUIL (o número de cuenta si no estuviera cargado)');
    }
  }
}

