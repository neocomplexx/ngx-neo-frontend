import { Injectable, Inject } from '@angular/core';
import { NamedBlobDTO } from '../../models';
import { ExceptionManagerService } from '../exception-manager/exception-manager.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AuthRequestDTO } from '../../models';
import { AuditLogEntryDTO } from '../../models';
import { FrontEndConfigService, FrontEndConfig } from '../../FrontendConfig';

@Injectable({
   providedIn: 'root'
})
export class UserServiceBackend {

   constructor(@Inject(FrontEndConfigService) protected Constants: FrontEndConfig,
      protected http: HttpClient, protected exceptionManager: ExceptionManagerService) { }

   public async getUserIdAuditory(id: number): Promise<Array<AuditLogEntryDTO>> {
      return this.exceptionManager.executeAsync(async () => {
         const res = await this.http.get(this.Constants.apiURL + '/user/' + id + '/Auditory').toPromise();
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

   public async insertUserDeviceID(authRequestDTO: AuthRequestDTO): Promise<void> {
      return this.exceptionManager.executeAsync(async () => {
         await this.http.post(this.Constants.apiURL + '/user/deviceID', authRequestDTO).toPromise();
      });
   }

}
