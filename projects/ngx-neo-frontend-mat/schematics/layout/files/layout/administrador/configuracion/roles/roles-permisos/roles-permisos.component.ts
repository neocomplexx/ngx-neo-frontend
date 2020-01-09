import { Component, Input } from '@angular/core';
import { ICommand, Command } from '@neocomplexx/ngx-neo-directives-mat';
import { BehaviorSubject } from 'rxjs';
import { NeoComponentAsync } from '@neocomplexx/ngx-neo-frontend-mat';
import { PermissionModelDTO } from '@neocomplexx/ngx-neo-frontend-mat';
import { PermissionDTO } from '@neocomplexx/ngx-neo-frontend-mat';
import { RolesService } from '../roles.service';
import { HeaderUaalooService } from 'src/app/core/header-uaaloo/header-uaaloo.service';

@Component({
    selector: 'app-configuracion-rol-permisos',
    templateUrl: './roles-permisos.component.html'
})
export class RolesPermisosComponent extends NeoComponentAsync {

    public permisos: Array<PermissionModelDTO >;

    public actualizarCmd: ICommand = new Command(() => this.actualizar(), new BehaviorSubject(true), true);

    public buscarEntidad: string;
    public buscarMetodo: string;
    public buscarDescripcion: string;

    public ignorarTodos: boolean;

    public displayedColumns: string[] = ['Entidad', 'Metodo', 'Permiso' , 'Ignorar' , ' ' ];

    constructor(public configuracionRolService: RolesService, protected headerService: HeaderUaalooService) {
        super(headerService);
        this.permisos = new Array<PermissionModelDTO >();
        this.ignorarTodos = false;
    /*   this.headerService.beforeBack = (beforeBackArgs) => {
        
            beforeBackArgs.cancelBack = true;
        };*/
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

