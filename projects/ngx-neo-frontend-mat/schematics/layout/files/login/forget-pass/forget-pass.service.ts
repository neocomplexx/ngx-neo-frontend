import { Injectable } from '@angular/core';
import { AuthServiceBackend, AuthChangePasswordRequestDTO } from '@neocomplexx/ngx-neo-frontend-mat';

@Injectable({
    providedIn: 'root'
  })
export class ForgetPassService {

    constructor(private authServiceBackend: AuthServiceBackend) {}

    public async cambiarContrasenia(passwordRequest: AuthChangePasswordRequestDTO): Promise<AuthChangePasswordRequestDTO> {
        const res = await this.authServiceBackend.updateAuthChangePassword(passwordRequest);
        return res;
    }

}
