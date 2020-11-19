import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { NewNotificationDTO } from './DTO/newNotification.DTO';
import { NotificationDTO } from './DTO/notification.DTO';
import { NotificationModelDTO } from './notification.ModelDTO';


export class NewNotificationModelDTO extends EntityModelDTO<NewNotificationDTO> {

   private notificationModel: NotificationModelDTO;
   private notificationSubscribe: Subscription;

   public constructor(protected entityDTO: NewNotificationDTO) {
      super(entityDTO);
   }

   public setEntityDTO(entityDTO: NewNotificationDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO === null) { return; }
      this.notificationModel = new NotificationModelDTO(this.entityDTO.notification);
      this.notificationSubscribe = this.notificationModel.changed.subscribe((changed) => this.changed.next(changed));
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }

   public dispose(): void {
      this.notificationModel.dispose();
      this.notificationSubscribe.unsubscribe();
   }

   get UsersName(): Array<string> { return this.entityDTO.usersName; }
   set UsersName(value: Array<string>) { this.notifyChangeDTO('usersName', value); }

   get RoleIds(): Array<number> { return this.entityDTO.roleIds; }
   set RoleIds(value: Array<number>) { this.notifyChangeDTO('roleIds', value); }

   get NotificationModel(): NotificationModelDTO { return this.notificationModel; }
   get Notification(): NotificationDTO { return this.notificationModel.getEntityDTO(); }
   set Notification(value: NotificationDTO) { this.notifyChange(() => { this.entityDTO.notification = value; this.notificationModel.setEntityDTO(value); }); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }
}
