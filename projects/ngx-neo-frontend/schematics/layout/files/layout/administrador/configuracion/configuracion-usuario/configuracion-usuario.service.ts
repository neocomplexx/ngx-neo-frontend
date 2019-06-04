import { Injectable } from '@angular/core';
import { UsersServiceBackend, UserDTO } from '@neocomplexx/ngx-neo-frontend';
import { AuthServiceBackend } from '@neocomplexx/ngx-neo-frontend';
import { UsuarioConsultaModel } from './configuracion-usuario-consulta/usuario-consulta.model';
import { UsuarioGeneracionModel } from './configuracion-usuario-generacion/usuario-generacion.model';
import { AuthEditUserRequestDTO } from '@neocomplexx/ngx-neo-frontend';
import { AuthNewUserRequestDTO } from '@neocomplexx/ngx-neo-frontend';
import { AuthChangePasswordRequestDTO } from '@neocomplexx/ngx-neo-frontend';
import { UsuarioBasicConsultaModel } from './configuracion-usuario-consulta/usuario-basic-consulta.model';

@Injectable({
    providedIn: 'root'
})
export class ConfiguracionUsuarioService {

    constructor (public usersServiceBackend: UsersServiceBackend, public authServiceBackend: AuthServiceBackend) {}

    /**
     * Obtengo todos los usuarios del sistema desde el backend
     * @author bdilschneider
     */
    public async getUsers(): Promise<Array<UsuarioConsultaModel>> {
       const usuarios: Array<UsuarioConsultaModel> = new Array<UsuarioConsultaModel>();
       const res = await this.usersServiceBackend.getUsers(true);
       for (const user of res) {
        const userModel: UsuarioConsultaModel = new UsuarioConsultaModel(user);
        usuarios.push(userModel);
       }
       return usuarios;
    }

    /**
     * Obtengo todos los usuarios del sistema desde el backend, trayendo unicamente la info necesaria
     * @author gherrou
     */
    public async getUsersBasic(): Promise<Array<UsuarioBasicConsultaModel>> {
        const usuarios: Array<UsuarioBasicConsultaModel> = new Array<UsuarioBasicConsultaModel>();
        const res = await this.usersServiceBackend.getUsersBasic();
        for (const user of res) {
         const userModel: UsuarioBasicConsultaModel = new UsuarioBasicConsultaModel(user);
         usuarios.push(userModel);
        }
        return usuarios;
     }

    /**
     * Servicio para editar un usuario especifico
     * @author laguirre
     */
    public async editUser(id: number, user: UsuarioGeneracionModel) {
        const authEditUserRequestDTO: AuthEditUserRequestDTO = new AuthEditUserRequestDTO();
        authEditUserRequestDTO.firstName = user.getEntityDTO().firstName;
        authEditUserRequestDTO.lastName = user.getEntityDTO().lastName;
        authEditUserRequestDTO.userName = user.getEntityDTO().userName;
        authEditUserRequestDTO.idRole = user.getEntityDTO().idRole;
        authEditUserRequestDTO.idUserOwner = user.getEntityDTO().idUserOwner;
        await this.usersServiceBackend.updateUsersId(id, authEditUserRequestDTO);
    }

    /**
     * Obtengo un usuario segun su id
     * @author laguirre
     */
    public async getUser(id: number): Promise<UsuarioConsultaModel> {
        const user: UserDTO = await this.usersServiceBackend.getUsersId(id);
        return new UsuarioConsultaModel(user);
    }

    /**
     * Obtengo un usuario segun su username
     * @author laguirre
     */
    public async getUserByUsername(username: string): Promise<UsuarioConsultaModel> {
        const user: UserDTO = await this.usersServiceBackend.getUsersUsernameUSERNAME(username);
        return new UsuarioConsultaModel(user);
    }

    /**
     * Inserto un usuario nuevo al backend
     * @author bdilschneider
     */
    public async insertUser(authNewUserRequestDTO: AuthNewUserRequestDTO): Promise<void> {
        await this.usersServiceBackend.insertUsers(authNewUserRequestDTO);
    }

    /**
     * Elimina un usuario del backend segun su id
     * @author laguirre
     */
    public async deleteUser(id: number): Promise<void> {
        await this.usersServiceBackend.deleteUsersId(id);
    }

    /**
     * Edita la contraseña de un usuario
     * @author laguirre
     */
    public async refreshPassword(authChangePasswordRequestDTO: AuthChangePasswordRequestDTO): Promise<void> {
        await this.authServiceBackend.updateAuthChangePassword(authChangePasswordRequestDTO);
    }
}
