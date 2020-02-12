import { Injectable, Inject } from '@angular/core';
import { NamedBlobDTO } from '../../models';
import { ExceptionManagerService } from '../exception-manager/exception-manager.service';
import { FrontEndConfigService, FrontEndConfig } from '../../FrontendConfig';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AuditLogEntryDTO } from '../../models';
import { ModulePermissionsDTO } from '../../models';
import { PermissionDTO } from '../../models';
import { UpdatePermissionsDTO } from '../../models';

@Injectable({
 providedIn: 'root'
})
export class PermissionServiceBackend {

   constructor (@Inject(FrontEndConfigService) protected Constants: FrontEndConfig,
      protected http: HttpClient, protected exceptionManager: ExceptionManagerService) {}

   public async getPermissionsIdAuditory(id: number): Promise<Array<AuditLogEntryDTO>> {
      return this.exceptionManager.executeAsync(async () => {
      const res = await this.http.get(this.Constants.apiURL + '/permissions/' + id + '/Auditory').toPromise();
      const resJson = res['data'];
      const resDTO = new Array<AuditLogEntryDTO>();
      for (const item of resJson) {
         const itemDTO = new AuditLogEntryDTO()
         itemDTO.PrepareDTO(item);
         resDTO.push(itemDTO);
      }
      return resDTO;
      });
   }

   public async insertPermissionsLoadpermissions(permissionDTO: PermissionDTO): Promise<Array<PermissionDTO>> {
      return this.exceptionManager.executeAsync(async () => {
      const res = await this.http.post(this.Constants.apiURL + '/permissions/loadpermissions', permissionDTO).toPromise();
      const resJson = res['data'];
      const resDTO = new Array<PermissionDTO>();
      for (const item of resJson) {
         const itemDTO = new PermissionDTO()
         itemDTO.PrepareDTO(item);
         resDTO.push(itemDTO);
      }
      return resDTO;
      });
   }

   public async getPermissions(pageNumber: number, pageSize: number): Promise<Array<PermissionDTO>> {
      return this.exceptionManager.executeAsync(async () => {
      const res = await this.http.get(this.Constants.apiURL + '/permissions/' + '?pageNumber=' + pageNumber + '&pageSize=' + pageSize).toPromise();
      const resJson = res['data'];
      const resDTO = new Array<PermissionDTO>();
      for (const item of resJson) {
         const itemDTO = new PermissionDTO()
         itemDTO.PrepareDTO(item);
         resDTO.push(itemDTO);
      }
      return resDTO;
      });
   }

   public async getPermissionsModulesPermissions(includeIgnoreds: number): Promise<Array<ModulePermissionsDTO>> {
      return this.exceptionManager.executeAsync(async () => {
      const res = await this.http.get(this.Constants.apiURL + '/permissions/modulesPermissions' + '?includeIgnoreds=' + includeIgnoreds).toPromise();
      const resJson = res['data'];
      const resDTO = new Array<ModulePermissionsDTO>();
      for (const item of resJson) {
         const itemDTO = new ModulePermissionsDTO()
         itemDTO.PrepareDTO(item);
         resDTO.push(itemDTO);
      }
      return resDTO;
      });
   }

   public async updatePermissionsPermissions(updatePermissionsDTO: UpdatePermissionsDTO): Promise<Array<PermissionDTO>> {
      return this.exceptionManager.executeAsync(async () => {
      const res = await this.http.put(this.Constants.apiURL + '/permissions/permissions', updatePermissionsDTO).toPromise();
      const resJson = res['data'];
      const resDTO = new Array<PermissionDTO>();
      for (const item of resJson) {
         const itemDTO = new PermissionDTO()
         itemDTO.PrepareDTO(item);
         resDTO.push(itemDTO);
      }
      return resDTO;
      });
   }

}
