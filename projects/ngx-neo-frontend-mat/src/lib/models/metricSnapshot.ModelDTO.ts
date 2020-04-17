import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { MetricSnapshotDTO } from './DTO/metricSnapshot.DTO';


export class MetricSnapshotModelDTO extends EntityModelDTO<MetricSnapshotDTO> {


   public constructor(protected entityDTO: MetricSnapshotDTO) {
      super(entityDTO);
   }
   public setEntityDTO(entityDTO: MetricSnapshotDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO == null) return;
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }
   public dispose(): void {
   }

   get TimeStamp(): string { return this.dateToString(this.entityDTO.timeStamp); }
   set TimeStamp(value: string) {
      const date = this.stringToDate(value);
      if (date) { this.notifyChangeDTO('timeStamp', date); }
   }

   get TimeSpan(): number { return this.entityDTO.timeSpan; }
   set TimeSpan(value: number) { this.notifyChangeDTO('timeSpan', value); }

   get TotalCompletedRequest(): number { return this.entityDTO.totalCompletedRequest; }
   set TotalCompletedRequest(value: number) { this.notifyChangeDTO('totalCompletedRequest', value); }

   get TotalFailedRequest(): number { return this.entityDTO.totalFailedRequest; }
   set TotalFailedRequest(value: number) { this.notifyChangeDTO('totalFailedRequest', value); }

   get MinSpanToCompletedRespond(): number { return this.entityDTO.minSpanToCompletedRespond; }
   set MinSpanToCompletedRespond(value: number) { this.notifyChangeDTO('minSpanToCompletedRespond', value); }

   get MaxSpanToCompletedRespond(): number { return this.entityDTO.maxSpanToCompletedRespond; }
   set MaxSpanToCompletedRespond(value: number) { this.notifyChangeDTO('maxSpanToCompletedRespond', value); }

   get AvgSpanToCompletedRespond(): number { return this.entityDTO.avgSpanToCompletedRespond; }
   set AvgSpanToCompletedRespond(value: number) { this.notifyChangeDTO('avgSpanToCompletedRespond', value); }

   get MinSpanToFailedRespond(): number { return this.entityDTO.minSpanToFailedRespond; }
   set MinSpanToFailedRespond(value: number) { this.notifyChangeDTO('minSpanToFailedRespond', value); }

   get MaxSpanToFailedRespond(): number { return this.entityDTO.maxSpanToFailedRespond; }
   set MaxSpanToFailedRespond(value: number) { this.notifyChangeDTO('maxSpanToFailedRespond', value); }

   get AvgSpanToFailedRespond(): number { return this.entityDTO.avgSpanToFailedRespond; }
   set AvgSpanToFailedRespond(value: number) { this.notifyChangeDTO('avgSpanToFailedRespond', value); }

   get AvgCompletedRequestBySecond(): number { return this.entityDTO.avgCompletedRequestBySecond; }
   set AvgCompletedRequestBySecond(value: number) { this.notifyChangeDTO('avgCompletedRequestBySecond', value); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }
}
