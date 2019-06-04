import { Component, Input } from '@angular/core';
import { ConfiguracionRolService } from '../configuracion-rol.service';
import { ICommand, Command } from '@neocomplexx/ngx-neo-directives';
import { BehaviorSubject } from 'rxjs';
import { NeoComponentAsync } from '@neocomplexx/ngx-neo-frontend';
import { PermissionModelDTO } from '@neocomplexx/ngx-neo-frontend';
import { PermissionDTO } from '@neocomplexx/ngx-neo-frontend';
import { Header<%=classify(projectName)%>Service } from 'src/app/core/header-<%=dasherize(projectName)%>/header-<%=dasherize(projectName)%>.service';

@Component({
    selector: 'app-configuracion-rol-permisos',
    templateUrl: './configuracion-rol-permisos.component.html'
})
export class ConfiguracionRolPermisosComponent extends NeoComponentAsync {

    @Input() tabSelectedId: BehaviorSubject<string>;
    public permisos: Array<PermissionModelDTO >;

    public actualizarCmd: ICommand = new Command(() => this.actualizar(), new BehaviorSubject(true), true);

    public buscarEntidad: string;
    public buscarMetodo: string;
    public buscarDescripcion: string;

    public ignorarTodos: boolean;

    constructor(public configuracionRolService: ConfiguracionRolService, protected headerService: Header<%=classify(projectName)%>Service) {
        super(headerService);
        this.permisos = new Array<PermissionModelDTO >();
        this.ignorarTodos = false;

        this.headerService.beforeBack = (beforeBackArgs) => {
            this.tabSelectedId.next('consulta');
            beforeBackArgs.cancelBack = true;
        };
    }

    async ngOnInitAsync() {
        const permisosDTO: Array<PermissionDTO> = await this.configuracionRolService.getPermisos(0, 0);
        for (const permisoDTO of permisosDTO) {
            this.permisos.push(new PermissionModelDTO (permisoDTO));
        }
    }

    public comprobarIgnorarTodos() {
        this.ignorarTodos = !this.ignorarTodos;
        for (const permiso of this.permisos) {
            permiso.Ignore = this.ignorarTodos;
        }
    }

    public async actualizar() {
        const permissionsDTO: Array<PermissionDTO> = new Array<PermissionDTO>();
        for (const permissionModel of this.permisos) {
            permissionsDTO.push(permissionModel.getEntityDTO());
        }

        this.permisos = new Array<PermissionModelDTO >();
        for (const permissionDTO of await this.configuracionRolService.updatePermisos(permissionsDTO)) {
            this.permisos.push(new PermissionModelDTO (permissionDTO));
        }
    }
}

