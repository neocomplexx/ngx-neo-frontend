import { Injectable, Inject } from '@angular/core';
import { DataDTO, NamedBlobDTO } from '../../models';
import { ExceptionManagerService } from '../exception-manager/exception-manager.service';
import { FrontEndConfigService, FrontEndConfig } from '../../FrontendConfig';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class PublicFilesServiceBackend {

   constructor(@Inject(FrontEndConfigService) protected Constants: FrontEndConfig,
      protected http: HttpClient, protected exceptionManager: ExceptionManagerService) { }

   public async getPublicfilesFOLDERLINKEXT(fOLDER: string, lINK: string, eXT: string, download: boolean = false, namedBlob: NamedBlobDTO = null): Promise<Blob> {
      return this.exceptionManager.executeAsync(async () => {
         const res = await this.http.get(this.Constants.apiURL +
'/publicfiles/' + fOLDER + '/' + lINK + '.' + eXT + '?download=' + download + '&BLOB=true', { observe: 'response', responseType: 'blob' }).toPromise();
         const resDTO = new Blob([res.body], { type: 'application/pdf' });
         if (namedBlob) {
            namedBlob.setBlobNameFromHttpResponse(res);
            namedBlob.blob = res.body;
         }
         return resDTO;
      });
   }

}
