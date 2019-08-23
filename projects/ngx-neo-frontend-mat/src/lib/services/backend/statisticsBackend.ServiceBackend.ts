import { Injectable, Inject } from '@angular/core';
import { NamedBlobDTO } from '../../models';
import { ExceptionManagerService } from '../exception-manager/exception-manager.service';
import { FrontEndConfigService, FrontEndConfig } from '../../ngx-neo-frontend-mat.module';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { MetricSnapshotDTO } from '../../models';

@Injectable({
 providedIn: 'root'
})
export class StatisticsBackendServiceBackend {

   constructor (@Inject(FrontEndConfigService) protected Constants: FrontEndConfig,
      protected http: HttpClient, protected exceptionManager: ExceptionManagerService) {}

   public async insertStatisticsBackendResetGlobalMetrics(): Promise<void> {
      return this.exceptionManager.executeAsync(async () => {
      await this.http.post(this.Constants.apiURL + '/statisticsBackend/resetGlobalMetrics', null).toPromise();
      });
   }

}
