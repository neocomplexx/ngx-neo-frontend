import { Injectable, Inject } from '@angular/core';
import { NamedBlobDTO } from '../../models';
import { ExceptionManagerService } from '../exception-manager/exception-manager.service';
import { FrontEndConfigService, FrontEndConfig } from '../../ngx-neo-frontend.module';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AuthEditUserRequestDTO } from '../../models';
import { AuthNewUserRequestDTO } from '../../models';
import { UserBasicDTO } from '../../models';
import { UserDTO } from '../../models';

@Injectable({
 providedIn: 'root'
})
export class UsersServiceBackend {

   constructor (@Inject(FrontEndConfigService) protected Constants: FrontEndConfig,
      protected http: HttpClient, protected exceptionManager: ExceptionManagerService) {}

   public async getUsers(withoutRole: boolean): Promise<Array<UserDTO>> {
      return this.exceptionManager.executeAsync(async () => {
      const res = await this.http.get(this.Constants.apiURL + '/users/' + '?withoutRole=' + withoutRole).toPromise();
      const resJson = res['data'];
      const resDTO = new Array<UserDTO>();
      for (const item of resJson) {
         const itemDTO = new UserDTO()
         itemDTO.PrepareDTO(item);
         resDTO.push(itemDTO);
      }
      return resDTO;
      });
   }

   public async getUsersAutoComplete(contiene: string, pageSize: number): Promise<Array<UserBasicDTO>> {
      return this.exceptionManager.executeAsync(async () => {
      const res = await this.http.get(this.Constants.apiURL + '/users/autoComplete' + '?contiene=' + contiene + '&pageSize=' + pageSize).toPromise();
      const resJson = res['data'];
      const resDTO = new Array<UserBasicDTO>();
      for (const item of resJson) {
         const itemDTO = new UserBasicDTO()
         itemDTO.PrepareDTO(item);
         resDTO.push(itemDTO);
      }
      return resDTO;
      });
   }

   public async getUsersId(id: number): Promise<UserDTO> {
      return this.exceptionManager.executeAsync(async () => {
      const res = await this.http.get(this.Constants.apiURL + '/users/' + id).toPromise();
      if (!res) { return null; }
      const resDTO = new UserDTO();
      resDTO.PrepareDTO(res);
      return resDTO;
      });
   }

   public async getUsersUsernameUSERNAME(username: string): Promise<UserDTO> {
      return this.exceptionManager.executeAsync(async () => {
      const res = await this.http.get(this.Constants.apiURL + '/users/username/' + username).toPromise();
      if (!res) { return null; }
      const resDTO = new UserDTO();
      resDTO.PrepareDTO(res);
      return resDTO;
      });
   }

   public async getUsersSystemUSERNAME(username: string): Promise<UserDTO> {
      return this.exceptionManager.executeAsync(async () => {
      const res = await this.http.get(this.Constants.apiURL + '/users/system/' + username).toPromise();
      if (!res) { return null; }
      const resDTO = new UserDTO();
      resDTO.PrepareDTO(res);
      return resDTO;
      });
   }

   public async getUsersBasic(onlyAdministratives: boolean = false): Promise<Array<UserBasicDTO>> {
      return this.exceptionManager.executeAsync(async () => {
      const res = await this.http.get(this.Constants.apiURL + '/users/basic' + '?OnlyAdministratives=' + onlyAdministratives).toPromise();
      const resJson = res['data'];
      const resDTO = new Array<UserBasicDTO>();
      for (const item of resJson) {
         const itemDTO = new UserBasicDTO()
         itemDTO.PrepareDTO(item);
         resDTO.push(itemDTO);
      }
      return resDTO;
      });
   }

   public async insertUsers(authNewUserRequestDTO: AuthNewUserRequestDTO): Promise<void> {
      return this.exceptionManager.executeAsync(async () => {
      await this.http.post(this.Constants.apiURL + '/users/', authNewUserRequestDTO).toPromise();
      });
   }

   public async updateUsersId(id: number, authEditUserRequestDTO: AuthEditUserRequestDTO): Promise<UserDTO> {
      return this.exceptionManager.executeAsync(async () => {
      const res = await this.http.put(this.Constants.apiURL + '/users/' + id, authEditUserRequestDTO).toPromise();
      const resDTO = new UserDTO();
      resDTO.PrepareDTO(res);
      return resDTO;
      });
   }

   public async deleteUsersId(id: number): Promise<void> {
      return this.exceptionManager.executeAsync(async () => {
      await this.http.delete(this.Constants.apiURL + '/users/' + id).toPromise();
      });
   }

   public async deleteUsersUSERNAMEBlankPassword(username: string): Promise<void> {
      return this.exceptionManager.executeAsync(async () => {
      await this.http.delete(this.Constants.apiURL + '/users/' + username + '/blankPassword').toPromise();
      });
   }

}