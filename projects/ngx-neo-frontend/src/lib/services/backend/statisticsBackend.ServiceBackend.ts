import { Injectable, Inject } from '@angular/core';
import { NamedBlobDTO } from '../../models';
import { ExceptionManagerService } from '../exception-manager/exception-manager.service';
import { FrontEndConfigService, FrontEndConfig } from '../../ngx-neo-frontend.module';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AuditLogEntryDTO } from '../../models';
import { MetricSnapshotDTO } from '../../models';

@Injectable({
   providedIn: 'root'
})
export class StatisticsBackendServiceBackend {

   constructor(@Inject(FrontEndConfigService) protected Constants: FrontEndConfig,
      protected http: HttpClient, protected exceptionManager: ExceptionManagerService) { }

   public async getStatisticsBackendIdAuditory(id: number): Promise<Array<AuditLogEntryDTO>> {
      return this.exceptionManager.executeAsync(async () => {
         const res = await this.http.get(this.Constants.apiURL + '/statisticsBackend/' + id + '/Auditory').toPromise();
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

   public async insertStatisticsBackendResetGlobalMetrics(): Promise<void> {
      return this.exceptionManager.executeAsync(async () => {
         await this.http.post(this.Constants.apiURL + '/statisticsBackend/resetGlobalMetrics', null).toPromise();
      });
   }

}
