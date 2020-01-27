import { Injectable, Inject } from '@angular/core';
import { NamedBlobDTO } from '../../models';
import { ExceptionManagerService } from '../exception-manager/exception-manager.service';
import { FrontEndConfigService, FrontEndConfig } from '../../ngx-neo-frontend-mat.module';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AuditLogEntryDTO } from '../../models';

@Injectable({
 providedIn: 'root'
})
export class FilesServiceBackend {

   constructor (@Inject(FrontEndConfigService) protected Constants: FrontEndConfig,
      protected http: HttpClient, protected exceptionManager: ExceptionManagerService) {}

   public async getFilesIdAuditory(id: number): Promise<Array<AuditLogEntryDTO>> {
      return this.exceptionManager.executeAsync(async () => {
      const res = await this.http.get(this.Constants.apiURL + '/files/' + id + '/Auditory').toPromise();
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

   public async getFilesBlobId(id: number, namedBlob: NamedBlobDTO = null): Promise<Blob> {
      return this.exceptionManager.executeAsync(async () => {
      const res = await this.http.get(this.Constants.apiURL + '/files/blob/' + id + '?BLOB=true', { observe:'response', responseType: 'blob'}).toPromise();
      const resDTO = new Blob([res.body], {type: 'application/pdf'});
      if(namedBlob) {
         namedBlob.setBlobNameFromHttpResponse(res);
         namedBlob.blob = res.body;
      }
      return resDTO;
      });
   }

}
