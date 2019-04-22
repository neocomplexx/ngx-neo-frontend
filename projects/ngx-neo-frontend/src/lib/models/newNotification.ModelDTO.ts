import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { NewNotificationDTO } from './DTO/newNotification.DTO';
import { NotificationDTO } from './DTO/notification.DTO';
import { NotificationModelDTO } from './notification.ModelDTO';


export class NewNotificationModelDTO extends EntityModelDTO<NewNotificationDTO> {

   private _NotificationModel: NotificationModelDTO;
   private notificationSubscribe: Subscription;

   public constructor(protected entityDTO: NewNotificationDTO) {
      super(entityDTO);
   }
   public setEntityDTO(entityDTO: NewNotificationDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO == null) return;
      this._NotificationModel = new NotificationModelDTO(this.entityDTO.notification);
      this.notificationSubscribe = this._NotificationModel.changed.subscribe((changed) => this.changed.next(changed));
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }
   public dispose(): void {
      this._NotificationModel.dispose();
      this.notificationSubscribe.unsubscribe();
   }

   get UsersName(): Array<string> { return this.entityDTO.usersName; }
   set UsersName(value: Array<string>) { this.notifyChangeDTO('usersName', value); }

   get NotificationModel(): NotificationModelDTO { return this._NotificationModel; }
   get Notification(): NotificationDTO { return this._NotificationModel.getEntityDTO(); }
   set Notification(value: NotificationDTO) { this.notifyChange(() => { this.entityDTO.notification = value; this._NotificationModel.setEntityDTO(value) }); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }
}
