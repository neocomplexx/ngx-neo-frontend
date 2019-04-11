import { IEntityDTO } from './entity.DTO';
import { NotificationDTO } from './notification.DTO';


export class NewNotificationDTO implements IEntityDTO {

   usersName: Array<string>;
   notification: NotificationDTO;
   id: number = 0;
   cacheStamp: number = 0;

   constructor() {
      this.notification = new NotificationDTO();
   }

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj == null) return;
      if (jsonObj['usersName'] != null) this.usersName = jsonObj['usersName'];
      if (jsonObj['notification'] != null) this.notification.PrepareDTO(jsonObj['notification']);
      if (jsonObj['id'] != null) this.id = jsonObj['id'];
      if (jsonObj['cacheStamp'] != null) this.cacheStamp = jsonObj['cacheStamp'];
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
