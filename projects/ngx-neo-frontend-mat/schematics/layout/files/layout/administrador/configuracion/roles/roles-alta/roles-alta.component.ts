import { Component, Input, OnDestroy } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ICommand, Command } from '@neocomplexx/ngx-neo-directives-mat';
import { RolesService } from '../roles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { NeoComponentAsync } from '@neocomplexx/ngx-neo-frontend';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ICommand, Command } from '@neocomplexx/ngx-neo-directives';
import { RoleDTO } from '@neocomplexx/ngx-neo-frontend';
import { RolePermissionState} from '@neocomplexx/ngx-neo-frontend';
import { RolePermissionDTO } from '@neocomplexx/ngx-neo-frontend';
import { RoleModelDTO} from '@neocomplexx/ngx-neo-frontend';
import { ConfiguracionRolService } from '../configuracion-rol.service';
import { ModulePermissionsDTO} from '@neocomplexx/ngx-neo-frontend';
import { NameDetailDTO } from '@neocomplexx/ngx-neo-frontend';
import { Header<%=classify(projectName)%>Service } from 'src/app/core/header-<%=dasherize(projectName)%>/header-<%=dasherize(projectName)%>.service';

@Component({
  selector: 'app-configuracion-rol-generacion',
  templateUrl: './roles-alta.component.html'
})
export class RolesAltaComponent extends NeoComponentAsync implements OnDestroy {

    // Modelo de generación de rol
    public rolGeneracionModel: RoleModelDTO;

    // Command para generar un rol
    public esValido: BehaviorSubject<boolean> = new BehaviorSubject(true);
    public generarCmd: ICommand = new Command(() => this.generarRol(), this.esValido, true);
    public editarCmd: ICommand = new Command(() => this.editarRol(), this.esValido, true);
    public cancelarCmd: ICommand = new Command(() => this.cancelar(), this.esValido, false);

    public items: Array<TreeviewItem>;
    public config: TreeviewConfig;
    public usersType: NameDetailDTO[];
    public changedSubscribe: Subscription;

    constructor(public configuracionRolService: RolesService, protected headerService: Header<%=classify(projectName)%>Service,
        public activeRoute: ActivatedRoute, public router: Router, protected breadcrumbService: BreadcrumbService,
        protected neoModalService: NgxNeoModalMatService) {
        super(headerService);
        this.breadcrumbService.addFriendlyNameForRouteRegex('\\/roles-alta(\\?.*)?$', 'Alta');
        this.rolGeneracionModel = new RoleModelDTO(new RoleDTO());

        this.items = new Array<TreeviewItem>();

        this.config = TreeviewConfig.create({
            hasAllCheckBox: false,
            hasFilter: false,
            hasCollapseExpand: true,
            decoupleChildFromParent: false,
           // maxHeight: 2000
        });

        const userTypes = UserModelDTO.getUserTypes();
        this.usersType = new Array<NameDetailDTO>();
        let userType = new NameDetailDTO();
        userTypes.forEach(element => {
            if (UserTypes[element] > 0) {
                const nameDetailDTO = new NameDetailDTO();
                nameDetailDTO.id = UserTypes[element];
                nameDetailDTO.name = element;
                this.usersType.push(nameDetailDTO);
            }
        });    
      
      /*  this.headerService.beforeBack = (beforeBackArgs) => {
            beforeBackArgs.cancelBack = true;
        };*/
    }

    async ngOnInitAsync(): Promise<void> {
        this.armarTree(await this.configuracionRolService.getModulosConPermisos(0));
        let rolAEditar = this.configuracionRolService.obtenerRolAEditar();
        if (rolAEditar) {
            const roleDTO: RoleDTO = rolAEditar.getEntityDTO();
            this.rolGeneracionModel = new RoleModelDTO(roleDTO);
            for (const permiso of roleDTO.permissions) {
                const item: TreeviewItem = this.items.find(x => x.text === (permiso.permission.module.replace('/', '').toUpperCase()));
                item.children.find(x => x.value === permiso.permission.id).checked = (permiso.state === RolePermissionState.Active);
                item.children.sort((x, y) => x.text.localeCompare(y.text));
                item.correctChecked();
            }

            this.configuracionRolService.setRolAEditar(null);
            // this.changedSubscribe = this.rolGeneracionModel.changed.subscribe((changed) => { this.headerService.notifyChange(changed) });
        } else {
            this.rolGeneracionModel = new RoleModelDTO(new RoleDTO());
            this.rolGeneracionModel.UserType = 1;
            // this.changedSubscribe =
               // this.rolGeneracionModel.changed.subscribe((changed) => { this.headerService.notifyChange(changed); });
        }

        this.changedSubscribe = this.rolGeneracionModel.changed.subscribe((changed) => { this.headerService.notifyChange(changed); });
        this.headerService.notifyChange(false);
    }

    public armarTree(modulesDTO: Array<ModulePermissionsDTO>) {
        this.items = new Array<TreeviewItem>();
        for (const moduleDTO of modulesDTO) {
            const permissions = [];
            for (const permissionDTO of moduleDTO.permissions) {
                const permission = { text: permissionDTO.description, value: permissionDTO.id, checked: permissionDTO.ignore };
                permissions.push(permission);
             }
             permissions.sort((x, y) => x.text.localeCompare(y.text));
             const treeItem: TreeviewItem = new TreeviewItem({ text: moduleDTO.name.replace('/', '').toUpperCase(),
                                                              value: moduleDTO.name, children: permissions, collapsed: true });
            this.items.push(treeItem);
        }
    }

    ngOnDestroy(): void {
       // this.cancelar();
      //  this.headerService.destroyComponent();
        this.changedSubscribe.unsubscribe();
    }

    /**
     * Crea un nuevo rol del sistema y envío dicho rol al servicio
     * @author bdilschneider
     */
    public async generarRol(): Promise<void> {


        const rol: RoleDTO = this.rolGeneracionModel.getEntityDTO();

        if (rol.name === '') {
          await  this.neoModalService.warning('Ingrese el nombre del rol');
        } else if (rol.description === '') {
           await this.neoModalService.warning('Ingrese la descripcion del rol');
        } else {
            rol.permissions =  new Array<RolePermissionDTO>();
            for (const module of this.items) {
                for (const permiso of module.children) {
                    if (permiso.checked) {
                        const permisoRol: RolePermissionDTO = new RolePermissionDTO();
                        permisoRol.permission.id = permiso.value;
                        permisoRol.state = RolePermissionState.Active;
                        rol.permissions.push(permisoRol);
                    }
                }
            }

            if (rol.permissions.length  === 0) {
              await this.neoModalService.warning('Debe asignar al menos un permiso al rol');
            } else {
                await this.configuracionRolService.insertUsuarioRol(rol);
                this.cancelar();
            }
        }
    }

    /**
     * Edita un rol existente del sistema y envio el cambio al servicio
     * @author bdilschneider
     */
    public async editarRol(): Promise<void> {
        const rolDTO: RoleDTO = this.rolGeneracionModel.getEntityDTO();
        rolDTO.permissions = new Array<RolePermissionDTO>();

        for (const module of this.items) {
            for (const permiso of module.children) {
                if (permiso.checked) {
                    const permisoRol: RolePermissionDTO = new RolePermissionDTO();
                    permisoRol.permission.id = permiso.value;
                    permisoRol.state = RolePermissionState.Active;
                    rolDTO.permissions.push(permisoRol);
                }
            }
        }

        if (rolDTO.permissions.length  === 0) {
           await this.neoModalService.warning('Debe asignar al menos un permiso al rol');
        } else {
            await this.configuracionRolService.updateUsuarioRol(rolDTO.id, rolDTO);
            this.cancelar();
        }
    }

    /**
     * Limpio la pantalla
     */
    public limpiarPantalla(): void {
        this.headerService.notifyChange(false);
        this.rolGeneracionModel.setEntityDTO(new RoleDTO());
    }

    public cancelar(): void {
        this.limpiarPantalla();
        this.headerService.closeComponent();
    }
}
