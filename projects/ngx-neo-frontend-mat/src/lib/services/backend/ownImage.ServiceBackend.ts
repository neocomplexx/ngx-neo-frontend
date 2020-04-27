import { Injectable, Inject } from '@angular/core';
import { NamedBlobDTO } from '../../models';
import { ExceptionManagerService } from '../exception-manager/exception-manager.service';
import { AuthTenantsResponseDTO } from '../../models';
import { FrontEndConfigService, FrontEndConfig } from '../../FrontendConfig';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class OwnImageServiceBackend {

   constructor(@Inject(FrontEndConfigService) protected Constants: FrontEndConfig,
      protected http: HttpClient, protected exceptionManager: ExceptionManagerService) { }

   public async getOwnimageENTIDADIdjpg(id: number, entidad: string, pixelsSize: number = 96, namedBlob: NamedBlobDTO = null): Promise<Blob> {
      return this.exceptionManager.executeAsync(async () => {
         const res = await this.http.get(this.Constants.apiURL + '/ownimage/' + entidad + '/' + id + '.jpg' + '?pixelsSize=' + pixelsSize + '&BLOB=true', { observe: 'response', responseType: 'blob' }).toPromise();
         const resDTO = new Blob([res.body], { type: 'application/pdf' });
         if (namedBlob) {
            namedBlob.setBlobNameFromHttpResponse(res);
            namedBlob.blob = res.body;
         }
         return resDTO;
      });
   }

}
