import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ModulePermissionsDTO } from '../../models/DTO/modulePermissions.DTO';
import { PermissionDTO } from '../../models/DTO/permission.DTO';
import { UpdatePermissionsDTO } from '../../models/DTO/updatePermissions.DTO';
import { ExceptionManagerService } from '../exception-manager';
import { FrontEndConfig, FrontEndConfigService } from '../../ngx-neo-frontend.module';

@Injectable({
 providedIn: 'root'
})
export class PermissionServiceBackend {

   constructor (@Inject(FrontEndConfigService) private Constants: FrontEndConfig,
   protected http: HttpClient, protected exceptionManager: ExceptionManagerService) {}

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
