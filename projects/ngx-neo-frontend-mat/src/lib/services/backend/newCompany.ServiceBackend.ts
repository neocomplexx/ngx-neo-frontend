import { Injectable, Inject } from '@angular/core';
import { NamedBlobDTO } from '../../models';
import { ExceptionManagerService } from '../exception-manager/exception-manager.service';
import { AuthTenantsResponseDTO } from '../../models';
import { FrontEndConfigService, FrontEndConfig } from '../../FrontendConfig';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AuthResponseDTO } from '../../models';
import { NeoCompanyWithAuthTokenDTO } from '../../models';

@Injectable({
   providedIn: 'root'
})
export class NewCompanyServiceBackend {

   constructor(@Inject(FrontEndConfigService) protected Constants: FrontEndConfig,
      protected http: HttpClient, protected exceptionManager: ExceptionManagerService) { }

   public async insertNewcompany(neoCompanyWithAuthTokenDTO: NeoCompanyWithAuthTokenDTO): Promise<AuthResponseDTO> {
      return this.exceptionManager.executeAsync(async () => {
         const res = await this.http.post(this.Constants.apiURL + '/newcompany/', neoCompanyWithAuthTokenDTO).toPromise();
         const resDTO = new AuthResponseDTO();
         resDTO.PrepareDTO(res);
         return resDTO;
      }, null, true, true);
   }

}
