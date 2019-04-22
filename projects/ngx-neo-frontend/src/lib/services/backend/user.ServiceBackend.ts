import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { FrontEndConfigService, FrontEndConfig } from '../../ngx-neo-frontend.module';
import { ExceptionManagerService } from '../exception-manager';
import { AuthRequestDTO } from '../../models';

@Injectable({
   providedIn: 'root'
})
export class UserServiceBackend {

   constructor(@Inject(FrontEndConfigService) private Constants: FrontEndConfig,
      protected http: HttpClient, protected exceptionManager: ExceptionManagerService) { }

   public async insertUserDeviceID(authRequestDTO: AuthRequestDTO): Promise<void> {
      return this.exceptionManager.executeAsync(async () => {
         await this.http.post(this.Constants.apiURL + '/user/deviceID', authRequestDTO).toPromise();
      });
   }

}
