import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Command, ICommand } from '@neocomplexx/ngx-neo-directives';
import { RoleModelDTO} from '@neocomplexx/ngx-neo-frontend';
import { ConfiguracionRolService } from '../configuracion-rol.service';
import { NeoComponentAsync } from '@neocomplexx/ngx-neo-frontend';
import { NgxNeoModalService, AlertButton } from '@neocomplexx/ngx-neo-modal';
import { Header<%=classify(projectName)%>Service } from 'src/app/core/header-<%=dasherize(projectName)%>/header-<%=dasherize(projectName)%>.service';
@Component({
    selector: 'app-configuracion-rol-consulta',
    templateUrl: './configuracion-rol-consulta.component.html'
})
export class ConfiguracionRolConsultaComponent extends NeoComponentAsync {

    @Input() tabSelectedId: BehaviorSubject<string>;
    @Input() idRol: BehaviorSubject <number>;

    // Modelos de consulta de roles
    public rolesConsulta: Array<RoleModelDTO>;

     // Command para editar un rol
     public esValido: BehaviorSubject<boolean> = new BehaviorSubject(true);
     public editarCmd: ICommand = new Command((value) => this.editarRol(value), this.esValido, true);

     // Command para eliminar un rol
     public eliminarCmd: ICommand = new Command((value) => this.eliminarRol(value), this.esValido, true);

     // Campos de la tabla a completar
     public searchNombre: string;
     public searchDescripcion: string;

    constructor(public configuracionRolService: ConfiguracionRolService, protected headerService: Header<%=classify(projectName)%>Service,
         private neoModalService: NgxNeoModalService) {
        super(headerService);

        this.scrollSavedActivated = true;

        this.rolesConsulta = new Array<RoleModelDTO>();
    }

    async ngOnInitAsync(): Promise<void> {
       // Traigo los roles del backend
       this.rolesConsulta = await this.configuracionRolService.getUsuariosroles();
    }

    /**
     * Manda a la pestaña generación para la edición del rol
     * @param value id del rol
     * @author bdilschneider
     */
    public async editarRol(value: number): Promise<void> {
        this.idRol.next(value);
        this.tabSelectedId.next('generacion');
    }

    /**
     * Elimino el rol seleccionado
     * @param value id del rol a eliminar
     * @author bdilschneider
     */
    public async eliminarRol(value: number): Promise<void> {
        const res = await this.neoModalService.decision('¿Está seguro que desea eliminar el rol?');
        if (res.ButtonResponse === AlertButton.Accept) {
            await this.configuracionRolService.eliminarRol(value); // ver porque no se elimina
            await this.actualizarVista();
        }
    }

    /** Actualizo la vista con los cambios realizados
     * @author bdilschneider
     */
    public async actualizarVista(): Promise<void> {
        this.rolesConsulta = await this.configuracionRolService.getUsuariosroles();
    }
}

