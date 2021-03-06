import { Injectable, Inject } from '@angular/core';
import { DataDTO, NamedBlobDTO } from '../../models';
import { ExceptionManagerService } from '../exception-manager/exception-manager.service';
import { FrontEndConfigService, FrontEndConfig } from '../../FrontendConfig';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AuditLogEntryDTO } from '../../models';
import { PublicLinkDTO } from '../../models';
import { QuoteFilesDTO } from '../../models';

@Injectable({
   providedIn: 'root'
})
export class FilesServiceBackend {

   constructor(@Inject(FrontEndConfigService) protected Constants: FrontEndConfig,
      protected http: HttpClient, protected exceptionManager: ExceptionManagerService) { }

   public async getFilesIdAuditory(id: number): Promise<Array<AuditLogEntryDTO>> {
      return this.exceptionManager.executeAsync(async () => {
         const res = await this.http.get<DataDTO>(this.Constants.apiURL + '/files/' + id + '/Auditory').toPromise();
         const resJson = res.data;
         const resDTO = new Array<AuditLogEntryDTO>();
         for (const item of resJson) {
            const itemDTO = new AuditLogEntryDTO();
            itemDTO.PrepareDTO(item);
            resDTO.push(itemDTO);
         }
         return resDTO;
      });
   }

   public async getFilesBlobId(id: number, namedBlob: NamedBlobDTO = null): Promise<Blob> {
      return this.exceptionManager.executeAsync(async () => {
         const res = await this.http.get(this.Constants.apiURL +
'/files/blob/' + id + '?BLOB=true', { observe: 'response', responseType: 'blob' }).toPromise();
         const resDTO = new Blob([res.body], { type: 'application/pdf' });
         if (namedBlob) {
            namedBlob.setBlobNameFromHttpResponse(res);
            namedBlob.blob = res.body;
         }
         return resDTO;
      });
   }

   public async getFilesPublicLinkId(id: number, expiredMinutes: number = 15): Promise<PublicLinkDTO> {
      return this.exceptionManager.executeAsync(async () => {
         const res = await this.http.get(this.Constants.apiURL + '/files/publicLink/' + id + '?expiredMinutes=' + expiredMinutes).toPromise();
         if (!res) { return null; }
         const resDTO = new PublicLinkDTO();
         resDTO.PrepareDTO(res);
         return resDTO;
      });
   }

   public async getFilesTotalQuote(): Promise<QuoteFilesDTO> {
      return this.exceptionManager.executeAsync(async () => {
         const res = await this.http.get(this.Constants.apiURL + '/files/totalQuote').toPromise();
         if (!res) { return null; }
         const resDTO = new QuoteFilesDTO();
         resDTO.PrepareDTO(res);
         return resDTO;
      });
   }

}
