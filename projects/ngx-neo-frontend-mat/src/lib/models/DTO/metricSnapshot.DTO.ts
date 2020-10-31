import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';

export class MetricSnapshotDTO implements IEntityDTO {

   timeStamp: Date;
   timeSpan = 0;
   totalCompletedRequest = 0;
   totalFailedRequest = 0;
   minSpanToCompletedRespond = 0;
   maxSpanToCompletedRespond = 0;
   avgSpanToCompletedRespond = 0;
   minSpanToFailedRespond = 0;
   maxSpanToFailedRespond = 0;
   avgSpanToFailedRespond = 0;
   avgCompletedRequestBySecond = 0;
   id = 0;
   cacheStamp = 0;

   constructor() {
   }

   public PrepareDTO(jsonObj): void {
      if (jsonObj === null) { return; }
      if (jsonObj.timeStamp != null) { this.timeStamp = new Date(jsonObj.timeStamp); }
      if (jsonObj.timeSpan != null) { this.timeSpan = jsonObj.timeSpan; }
      if (jsonObj.totalCompletedRequest != null) { this.totalCompletedRequest = jsonObj.totalCompletedRequest; }
      if (jsonObj.totalFailedRequest != null) { this.totalFailedRequest = jsonObj.totalFailedRequest; }
      if (jsonObj.minSpanToCompletedRespond != null) { this.minSpanToCompletedRespond = jsonObj.minSpanToCompletedRespond; }
      if (jsonObj.maxSpanToCompletedRespond != null) { this.maxSpanToCompletedRespond = jsonObj.maxSpanToCompletedRespond; }
      if (jsonObj.avgSpanToCompletedRespond != null) { this.avgSpanToCompletedRespond = jsonObj.avgSpanToCompletedRespond; }
      if (jsonObj.minSpanToFailedRespond != null) { this.minSpanToFailedRespond = jsonObj.minSpanToFailedRespond; }
      if (jsonObj.maxSpanToFailedRespond != null) { this.maxSpanToFailedRespond = jsonObj.maxSpanToFailedRespond; }
      if (jsonObj.avgSpanToFailedRespond != null) { this.avgSpanToFailedRespond = jsonObj.avgSpanToFailedRespond; }
      if (jsonObj.avgCompletedRequestBySecond != null) { this.avgCompletedRequestBySecond = jsonObj.avgCompletedRequestBySecond; }
      if (jsonObj.id != null) { this.id = jsonObj.id; }
      if (jsonObj.cacheStamp != null) { this.cacheStamp = jsonObj.cacheStamp; }
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
