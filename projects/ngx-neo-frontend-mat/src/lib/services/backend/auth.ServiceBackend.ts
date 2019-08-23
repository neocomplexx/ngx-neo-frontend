import { Injectable, Inject } from '@angular/core';
import { NamedBlobDTO } from '../../models';
import { ExceptionManagerService } from '../exception-manager/exception-manager.service';
import { FrontEndConfigService, FrontEndConfig } from '../../ngx-neo-frontend.module';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AuthChangePasswordRequestDTO } from '../../models';
import { AuthRequestDTO } from '../../models';
import { AuthResponseDTO } from '../../models';

@Injectable({
 providedIn: 'root'
})
export class AuthServiceBackend {

   constructor (@Inject(FrontEndConfigService) protected Constants: FrontEndConfig,
      protected http: HttpClient, protected exceptionManager: ExceptionManagerService) {}

   public async insertAuth(authRequestDTO: AuthRequestDTO): Promise<AuthResponseDTO> {
      return this.exceptionManager.executeAsync(async () => {
      const res = await this.http.post(this.Constants.apiURL + '/auth/', authRequestDTO).toPromise();
      const resDTO = new AuthResponseDTO();
      resDTO.PrepareDTO(res);
      return resDTO;
      }, null, true, true);
   }

   public async updateAuthChangePassword(authChangePasswordRequestDTO: AuthChangePasswordRequestDTO): Promise<AuthChangePasswordRequestDTO> {
      return this.exceptionManager.executeAsync(async () => {
      const res = await this.http.put(this.Constants.apiURL + '/auth/changePassword', authChangePasswordRequestDTO).toPromise();
      const resDTO = new AuthChangePasswordRequestDTO();
      resDTO.PrepareDTO(res);
      return resDTO;
      });
   }

   public async insertAuthTermsAccepted(authRequestDTO: AuthRequestDTO): Promise<AuthResponseDTO> {
      return this.exceptionManager.executeAsync(async () => {
      const res = await this.http.post(this.Constants.apiURL + '/auth/termsAccepted', authRequestDTO).toPromise();
      const resDTO = new AuthResponseDTO();
      resDTO.PrepareDTO(res);
      return resDTO;
      });
   }

   public async insertAuthValidateEmailCODE(code: string, authRequestDTO: AuthRequestDTO): Promise<AuthResponseDTO> {
      return this.exceptionManager.executeAsync(async () => {
      const res = await this.http.post(this.Constants.apiURL + '/auth/validateEmail/' + code, authRequestDTO).toPromise();
      const resDTO = new AuthResponseDTO();
      resDTO.PrepareDTO(res);
      return resDTO;
      });
   }

   public async insertAuthLogout(authRequestDTO: AuthRequestDTO): Promise<void> {
      return this.exceptionManager.executeAsync(async () => {
      await this.http.post(this.Constants.apiURL + '/auth/logout', authRequestDTO).toPromise();
      }, null, false, true);
   }

}