import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Command, ICommand } from '@neocomplexx/ngx-neo-directives';
import { UserDTO } from '@neocomplexx/ngx-neo-frontend';
import { AuthChangePasswordRequestDTO, NeoComponentAsync } from '@neocomplexx/ngx-neo-frontend';
import { UserModelDTO } from '@neocomplexx/ngx-neo-frontend';
import { PerfilNewPasswordModel } from './perfil-user-new-password.model';
import { PerfilService } from './perfil.service';
import { NgxNeoModalService } from '@neocomplexx/ngx-neo-modal';
import { Header<%=classify(projectName)%>Service } from 'src/app/core/header-<%=dasherize(projectName)%>/header-<%=dasherize(projectName)%>.service';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html'
})
export class PerfilComponent extends NeoComponentAsync {

    // Command para cambiar la contraseña
    public esValido: BehaviorSubject<boolean> = new BehaviorSubject(true);
    public cambiarCmd: ICommand = new Command(() => this.cambiarContrasenia(), this.esValido, true);

    // Modelos
    public usuarioActualModel: UserModelDTO;
    public cambioDeContraseniaModel: PerfilNewPasswordModel;

    constructor(public perfilService: PerfilService, public neoModalService: NgxNeoModalService,
        public headerService: Header<%=classify(projectName)%>Service) {
        super(headerService);
    }

    async ngOnInitAsync(): Promise<void> {
        this.cambioDeContraseniaModel = new PerfilNewPasswordModel(new AuthChangePasswordRequestDTO());
        this.usuarioActualModel = new UserModelDTO(new UserDTO());
        this.usuarioActualModel = new UserModelDTO(this.headerService.userLogged);
    }

    /**
     * Cambia la contraseña del usuario actual
     * @author bdilschneider
     */
    public async cambiarContrasenia(): Promise<void> {
        this.cambioDeContraseniaModel.UserName = this.usuarioActualModel.UserName;
        if (this.cambioDeContraseniaModel.Password !== this.cambioDeContraseniaModel.repeatPassword) {
            alert('La nueva contraseña y la repetición no coinciden, verifique.');
        } else {
            await this.perfilService.refreshPassword(this.cambioDeContraseniaModel.getEntityDTO());
            await this.neoModalService.alert('La contraseña se cambio con exito');
            this.cambioDeContraseniaModel = new PerfilNewPasswordModel(new AuthChangePasswordRequestDTO());
        }
    }
}
