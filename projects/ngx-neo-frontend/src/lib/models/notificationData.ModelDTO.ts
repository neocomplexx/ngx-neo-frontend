import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { NotificationDataDTO } from './DTO/notificationData.DTO';
import { NotificationDTO } from './DTO/notification.DTO';
import { NotificationModelDTO } from './notification.ModelDTO';


export class NotificationDataModelDTO extends EntityModelDTO<NotificationDataDTO> {


   public constructor(protected entityDTO: NotificationDataDTO) {
      super(entityDTO);
   }
   public setEntityDTO(entityDTO: NotificationDataDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO == null) return;
   }
   public dispose(): void {
   }

   get NotificationsNotSeen(): number { return this.entityDTO.notificationsNotSeen; }
   set NotificationsNotSeen(value: number) { this.notifyChangeDTO('notificationsNotSeen', value); }

   get Data(): Array<NotificationDTO> { return this.entityDTO.data; }
   set Data(value: Array<NotificationDTO>) { this.notifyChangeDTO('data', value); }

   get Total(): number { return this.entityDTO.total; }
   set Total(value: number) { this.notifyChangeDTO('total', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }
}
