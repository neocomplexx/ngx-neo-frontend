import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { FrontEndConfigService, FrontEndConfig } from '../../ngx-neo-frontend.module';
import { ExceptionManagerService } from '../exception-manager';
import { MessageDTO } from '../../models/DTO/message.DTO';

@Injectable({
 providedIn: 'root'
})
export class SendMailServiceBackend {

   constructor (@Inject(FrontEndConfigService) private Constants: FrontEndConfig,
   protected http: HttpClient, protected exceptionManager: ExceptionManagerService) {}

   public async insertSendmail(messageDTO: MessageDTO): Promise<void> {
      return this.exceptionManager.executeAsync(async () => {
      await this.http.post(this.Constants.apiURL + '/sendmail/', messageDTO).toPromise();
      });
   }

   public async insertSendmailConf1(messageDTO: MessageDTO): Promise<void> {
      return this.exceptionManager.executeAsync(async () => {
      await this.http.post(this.Constants.apiURL + '/sendmail/conf1', messageDTO).toPromise();
      });
   }

}
