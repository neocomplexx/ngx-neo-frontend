import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Command, ICommand } from '@neocomplexx/ngx-neo-directives';
import { NeoComponentAsync } from '@neocomplexx/ngx-neo-frontend';
import { ConfiguracionUsuarioService } from '../configuracion-usuario.service';
import { UsuarioConsultaModel } from './usuario-consulta.model';
import { UserRefreshPasswordModel } from './usuario-refresh-password/user-refresh-password.component.model';
import { AuthChangePasswordRequestDTO } from '@neocomplexx/ngx-neo-frontend';
import { UserRefreshPasswordComponent } from './usuario-refresh-password/user-refresh-password.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertButton, NgxNeoModalService } from '@neocomplexx/ngx-neo-modal';
import { UsuarioBasicConsultaModel } from './usuario-basic-consulta.model';
import { Header<%=classify(projectName)%>Service } from 'src/app/core/header-<%=dasherize(projectName)%>/header-<%=dasherize(projectName)%>.service';

@Component({
    selector: 'app-configuracion-usuario-consulta',
    templateUrl: './configuracion-usuario-consulta.component.html'
})
export class ConfiguracionUsuarioConsultaComponent extends NeoComponentAsync {

    @Input() tabSelectedId: BehaviorSubject<string>;
    @Input() idUsuario: BehaviorSubject<number>;

    // Modelo de usuarios
    public modeloUsuarios: Array<UsuarioBasicConsultaModel>;

    // Command para editar un usuario
    public esValido: BehaviorSubject<boolean> = new BehaviorSubject(true);
    public editarCmd: ICommand = new Command((value) => this.editarUsuario(value), this.esValido, true);
    public eliminarCmd: ICommand = new Command((value) => this.eliminarUsuario(value), this.esValido, true);
    public refreshPassCmd: ICommand = new Command((value) => this.refreshPass(value), this.esValido, false);

    // Campos de la tabla a completar
    public searchNombre: string;
    public searchRol: string;
    public searchUsuario: string;

    constructor( public configuracionUsuarioService: ConfiguracionUsuarioService, public modalService: NgbModal,
                 public neoModalService: NgxNeoModalService, protected headerService: Header<%=classify(projectName)%>Service) {
        super(headerService);

         this.scrollSavedActivated = true;
    }

    async ngOnInitAsync(): Promise<void> {
        // obtengo el arreglo de usuarios
        this.modeloUsuarios = await this.configuracionUsuarioService.getUsersBasic();
    }

    public async editarUsuario(value: number): Promise<void> {
        this.idUsuario.next(value);
        this.tabSelectedId.next('generacion');
    }

    /**
     * Elimino el usuario seleccionado
     * @param value id del usuario a eliminar
     */
    public async eliminarUsuario(value: number): Promise<void> {
        const res = await this.neoModalService.decision('¿Está seguro que desea eliminar el usuario?');
        if (res.ButtonResponse === AlertButton.Accept) {
            await this.configuracionUsuarioService.deleteUser(value);
            await this.actualizarVista();
        }
    }

    /** Actualizo la vista con los cambios realizados
     */
    public async actualizarVista(): Promise<void> {
       this.modeloUsuarios = await this.configuracionUsuarioService.getUsersBasic();
    }

    public async refreshPass(user: UsuarioConsultaModel): Promise<void> {
        const modalRef = this.modalService.open(UserRefreshPasswordComponent, {windowClass: 'modal-inverse'});
        const userRefreshPasswordModel: UserRefreshPasswordModel = new UserRefreshPasswordModel(new AuthChangePasswordRequestDTO());
        userRefreshPasswordModel.UserName = user.UserName;
        userRefreshPasswordModel.fullName = user.FullName;
        modalRef.componentInstance.userRefreshPasswordModel = userRefreshPasswordModel;
    }

}
