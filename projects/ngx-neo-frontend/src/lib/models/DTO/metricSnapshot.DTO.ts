import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';
 
export class MetricSnapshotDTO implements IEntityDTO {

   timeStamp: Date;
   timeSpan: number = 0;
   totalCompletedRequest: number = 0;
   totalFailedRequest: number = 0;
   minSpanToCompletedRespond: number = 0;
   maxSpanToCompletedRespond: number = 0;
   avgSpanToCompletedRespond: number = 0;
   minSpanToFailedRespond: number = 0;
   maxSpanToFailedRespond: number = 0;
   avgSpanToFailedRespond: number = 0;
   avgCompletedRequestBySecond: number = 0;
   id: number = 0;
   cacheStamp: number = 0;

   constructor() {
   }

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj == null) return;
      if (jsonObj['timeStamp'] != null) this.timeStamp = new Date(jsonObj['timeStamp']);
      if (jsonObj['timeSpan'] != null) this.timeSpan = jsonObj['timeSpan'];
      if (jsonObj['totalCompletedRequest'] != null) this.totalCompletedRequest = jsonObj['totalCompletedRequest'];
      if (jsonObj['totalFailedRequest'] != null) this.totalFailedRequest = jsonObj['totalFailedRequest'];
      if (jsonObj['minSpanToCompletedRespond'] != null) this.minSpanToCompletedRespond = jsonObj['minSpanToCompletedRespond'];
      if (jsonObj['maxSpanToCompletedRespond'] != null) this.maxSpanToCompletedRespond = jsonObj['maxSpanToCompletedRespond'];
      if (jsonObj['avgSpanToCompletedRespond'] != null) this.avgSpanToCompletedRespond = jsonObj['avgSpanToCompletedRespond'];
      if (jsonObj['minSpanToFailedRespond'] != null) this.minSpanToFailedRespond = jsonObj['minSpanToFailedRespond'];
      if (jsonObj['maxSpanToFailedRespond'] != null) this.maxSpanToFailedRespond = jsonObj['maxSpanToFailedRespond'];
      if (jsonObj['avgSpanToFailedRespond'] != null) this.avgSpanToFailedRespond = jsonObj['avgSpanToFailedRespond'];
      if (jsonObj['avgCompletedRequestBySecond'] != null) this.avgCompletedRequestBySecond = jsonObj['avgCompletedRequestBySecond'];
      if (jsonObj['id'] != null) this.id = jsonObj['id'];
      if (jsonObj['cacheStamp'] != null) this.cacheStamp = jsonObj['cacheStamp'];
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
