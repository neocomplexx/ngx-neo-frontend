import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { NamedBlobDTO } from '../../models';
import { FrontEndConfig, FrontEndConfigService } from '../../ngx-neo-frontend.module';
import { ExceptionManagerService } from '../exception-manager';
import { RoleDTO } from '../../models/DTO/role.DTO';

@Injectable({
 providedIn: 'root'
})
export class RoleServiceBackend {

   constructor (@Inject(FrontEndConfigService) private Constants: FrontEndConfig,
   protected http: HttpClient, protected exceptionManager: ExceptionManagerService) {}

   public async getUsuariosrolesIdPDF(id: number, namedBlob: NamedBlobDTO = null): Promise<Blob> {
      return this.exceptionManager.executeAsync(async () => {
      const res = await this.http.get(this.Constants.apiURL + '/usuariosroles/' + id + '/PDF' + '?BLOB=true', { observe:'response', responseType: 'blob'}).toPromise();
      const resDTO = new Blob([res.body], {type: 'application/pdf'});
      if(namedBlob) {
         namedBlob.setBlobNameFromHttpResponse(res);
         namedBlob.blob = res.body;
      }
      return resDTO;
      });
   }

   public async getUsuariosrolesIdEmisionesPDF(id: number): Promise<Array<RoleDTO>> {
      return this.exceptionManager.executeAsync(async () => {
      const res = await this.http.get(this.Constants.apiURL + '/usuariosroles/' + id + '/emisionesPDF').toPromise();
      const resJson = res['data'];
      const resDTO = new Array<RoleDTO>();
      for (const item of resJson) {
         const itemDTO = new RoleDTO()
         itemDTO.PrepareDTO(item);
         resDTO.push(itemDTO);
      }
      return resDTO;
      });
   }

   public async getUsuariosroles(): Promise<Array<RoleDTO>> {
      return this.exceptionManager.executeAsync(async () => {
      const res = await this.http.get(this.Constants.apiURL + '/usuariosroles/').toPromise();
      const resJson = res['data'];
      const resDTO = new Array<RoleDTO>();
      for (const item of resJson) {
         const itemDTO = new RoleDTO()
         itemDTO.PrepareDTO(item);
         resDTO.push(itemDTO);
      }
      return resDTO;
      });
   }

   public async insertUsuariosroles(roleDTO: RoleDTO): Promise<RoleDTO> {
      return this.exceptionManager.executeAsync(async () => {
      const res = await this.http.post(this.Constants.apiURL + '/usuariosroles/', roleDTO).toPromise();
      const resDTO = new RoleDTO();
      resDTO.PrepareDTO(res);
      return resDTO;
      });
   }

   public async updateUsuariosrolesId(id: number, roleDTO: RoleDTO): Promise<RoleDTO> {
      return this.exceptionManager.executeAsync(async () => {
      const res = await this.http.put(this.Constants.apiURL + '/usuariosroles/' + id, roleDTO).toPromise();
      const resDTO = new RoleDTO();
      resDTO.PrepareDTO(res);
      return resDTO;
      });
   }

   public async deleteUsuariosrolesId(id: number): Promise<void> {
      return this.exceptionManager.executeAsync(async () => {
      await this.http.delete(this.Constants.apiURL + '/usuariosroles/' + id).toPromise();
      });
   }

   public async getUsuariosrolesId(id: number): Promise<RoleDTO> {
      return this.exceptionManager.executeAsync(async () => {
      const res = await this.http.get(this.Constants.apiURL + '/usuariosroles/' + id).toPromise();
      if (!res) { return null };
      const resDTO = new RoleDTO();
      resDTO.PrepareDTO(res);
      return resDTO;
      });
   }

   public async insertUsuariosrolesIdClone(id: number, nombre: string, roleDTO: RoleDTO): Promise<RoleDTO> {
      return this.exceptionManager.executeAsync(async () => {
      const res = await this.http.post(this.Constants.apiURL + '/usuariosroles/' + id + '/clone' + '?nombre=' + nombre, roleDTO).toPromise();
      const resDTO = new RoleDTO();
      resDTO.PrepareDTO(res);
      return resDTO;
      });
   }

}
