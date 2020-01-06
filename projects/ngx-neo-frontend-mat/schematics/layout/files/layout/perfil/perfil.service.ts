import { Injectable } from '@angular/core';
import { UsersServiceBackend } from '@neocomplexx/ngx-neo-frontend-mat';
import { AuthChangePasswordRequestDTO } from '@neocomplexx/ngx-neo-frontend-mat';
import { AuthServiceBackend } from '@neocomplexx/ngx-neo-frontend-mat';


@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(protected usersServiceBackend: UsersServiceBackend, public authServiceBackend: AuthServiceBackend) {
  }

  /**
   * Cambia la contraseña de un usuario
   * @author bdilschneider
   */
  public async refreshPassword(authChangePasswordRequestDTO: AuthChangePasswordRequestDTO): Promise<void> {
    await this.authServiceBackend.updateAuthChangePassword(authChangePasswordRequestDTO);
  }

}
