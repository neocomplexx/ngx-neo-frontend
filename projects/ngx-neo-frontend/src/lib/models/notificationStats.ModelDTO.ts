import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { NotificationStatsDTO } from './DTO/notificationStats.DTO';
import { NotificationPriority } from './DTO/notificationPriority.ENUM';


export class NotificationStatsModelDTO extends EntityModelDTO<NotificationStatsDTO> {


   public constructor(protected entityDTO: NotificationStatsDTO) {
      super(entityDTO);
   }
   public setEntityDTO(entityDTO: NotificationStatsDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO == null) return;
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }
   public dispose(): void {
   }

   get Title(): string { return this.entityDTO.title; }
   set Title(value: string) { this.notifyChangeDTO('title', value); }

   get Details(): string { return this.entityDTO.details; }
   set Details(value: string) { this.notifyChangeDTO('details', value); }

   get UserName(): string { return this.entityDTO.userName; }
   set UserName(value: string) { this.notifyChangeDTO('userName', value); }

   get Total(): number { return this.entityDTO.total; }
   set Total(value: number) { this.notifyChangeDTO('total', value); }

   get Read(): number { return this.entityDTO.read; }
   set Read(value: number) { this.notifyChangeDTO('read', value); }

   get Unread(): number { return this.entityDTO.unread; }
   set Unread(value: number) { this.notifyChangeDTO('unread', value); }

   get Date(): string { return this.dateToString(this.entityDTO.date); }
   set Date(value: string) {
      const date = this.stringToDate(value);
      if (date) { this.notifyChangeDTO('date', date); }
   }

   get Priority(): string { return NotificationPriority[this.entityDTO.priority]; }
   set Priority(value: string) { this.notifyChangeDTO('priority', NotificationPriority[value]); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }

   public static getNotificationPriority(): string[] {
      return EntityModelDTO.getEnumArray(NotificationPriority);
   }
}
