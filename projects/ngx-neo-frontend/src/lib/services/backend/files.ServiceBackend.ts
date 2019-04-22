import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExceptionManagerService } from '../exception-manager';
import { FrontEndConfig, FrontEndConfigService } from '../../ngx-neo-frontend.module';
import { NamedBlobDTO } from '../../models/DTO/namedBlob.DTO';

@Injectable({
   providedIn: 'root'
})
export class FilesServiceBackend {

   constructor(@Inject(FrontEndConfigService) private Constants: FrontEndConfig,
      protected http: HttpClient, protected exceptionManager: ExceptionManagerService) { }

   public async getFilesBlobId(id: number, namedBlob: NamedBlobDTO = null): Promise<Blob> {
      return this.exceptionManager.executeAsync(async () => {
         const res = await this.http.get(this.Constants.apiURL + '/files/blob/' + id + '?BLOB=true',
            { observe: 'response', responseType: 'blob' }).toPromise();
         const resDTO = new Blob([res.body], { type: 'application/pdf' });
         if (namedBlob) {
            namedBlob.setBlobNameFromHttpResponse(res);
            namedBlob.blob = res.body;
         }
         return resDTO;
      });
   }

}
