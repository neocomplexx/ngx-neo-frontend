import { Injectable } from '@angular/core';
import { RoleModelDTO, RoleServiceBackend, PermissionServiceBackend, RoleDTO, 
         PermissionDTO, UpdatePermissionsDTO, ModulePermissionsDTO } from 'ngx-neo-frontend-mat/neocomplexx-ngx-neo-frontend-mat';


@Injectable({
    providedIn: 'root'
})
export class RolesService {

    private _rolAEditar: RoleModelDTO;

    constructor (public roleServiceBackend: RoleServiceBackend, public permisosServiceBackend: PermissionServiceBackend ) {}

    /** Obtengo del backend todos los roles del sistema
     *  @author bdilschneider
     */
    public async getUsuariosroles(): Promise<Array<RoleModelDTO>> {
        const rolesDeUsuarios: Array<RoleModelDTO> = new Array<RoleModelDTO>();
        const res = await this.roleServiceBackend.getUsuariosroles();
        for (const rol of res) {
            const rolItem: RoleModelDTO = new RoleModelDTO(rol);
            rolesDeUsuarios.push(rolItem);
        }
        return rolesDeUsuarios;
    }

    public async getUsuariosrolesBasicos(): Promise<Array<RoleDTO>> {
        const res = await this.roleServiceBackend.getUsuariosrolesBasic();
        return res;
    }

    /**
     * Inserto un nuevo rol al backend
     * @param roleDTO nuevo rol a insertar
     */
    public async insertUsuarioRol(roleDTO: RoleDTO): Promise<RoleDTO> {
        const rolDTO: RoleDTO = await this.roleServiceBackend.insertUsuariosroles(roleDTO);
        return rolDTO;
    }

    /**
     * Actualizo un rol y le paso los cambios al backend
     * @param id id del rol a actualizar
     * @param roleDTO rol a actualizar
     */
    public async updateUsuarioRol(id: number, roleDTO: RoleDTO): Promise<RoleDTO> {
        const rolDTO: RoleDTO = await this.roleServiceBackend.updateUsuariosrolesId(id, roleDTO);
        return rolDTO;
    }

    /**
     * Obtengo un rol determinado desde el backend
     * @param id id del rol a obtener
     * @author bdilschneider
     */
    public async getRolPorId (id: number): Promise<RoleDTO> {
        const roleDTO: RoleDTO = await this.roleServiceBackend.getUsuariosrolesId(id);
        return roleDTO;
    }

    /**
     * Crea un rol igual al pasado por parámetro desde el backend con el nombre indicado
     * @param id id del rol a clonar
     * @author bdilschneider
     */
    public async clonarRol(rolDTO: RoleDTO, nombre: string): Promise<RoleDTO> {
        return await this.roleServiceBackend.insertUsuariosrolesIdClone(rolDTO.id, nombre, rolDTO);
    }

    /**
     * Elimino un rol desde el backend cuyo id es el pasado por parámetro
     * @param id id del rol a eliminar
     * @author bdilschneider
     */
    public async eliminarRol(id: number) {
        await this.roleServiceBackend.deleteUsuariosrolesId(id);
    }

    /**
     * Obtengo todos los permisos posibles
     * @author laguirre
     */
    public async getPermisos(pageNumber: number, pageSize: number): Promise<Array<PermissionDTO>> {
        return await this.permisosServiceBackend.getPermissions(pageNumber, pageSize);
    }

    /**
     * Actualiza los permisos
     * @author laguirre
     */
    public async updatePermisos(permissionsDTO: Array<PermissionDTO>): Promise<Array<PermissionDTO>> {
        const updateDTO: UpdatePermissionsDTO = new UpdatePermissionsDTO();
        updateDTO.permissions = permissionsDTO;
        return await this.permisosServiceBackend.updatePermissionsPermissions(updateDTO);
    }

    /**
     * Obtengo todos los modulos con sus permisos posibles
     * @author laguirre
     */
    public async getModulosConPermisos(includeIgnoreds: number): Promise<Array<ModulePermissionsDTO>> {
        return await this.permisosServiceBackend.getPermissionsModulesPermissions(includeIgnoreds);
    }
    
    public setRolAEditar(rol: RoleModelDTO): void {
        this._rolAEditar = rol;
    }

    public obtenerRolAEditar(): RoleModelDTO {
        return this._rolAEditar;
    }
}
