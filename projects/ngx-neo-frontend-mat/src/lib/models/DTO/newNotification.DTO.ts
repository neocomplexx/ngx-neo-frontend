import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';
import { NotificationDTO } from './notification.DTO';


export class NewNotificationDTO implements IEntityDTO {

   usersName: Array<string>;
   roleIds: Array<number>;
   notification: NotificationDTO;
   id = 0;
   cacheStamp = 0;

   constructor() {
      this.notification = new NotificationDTO();
   }

   public PrepareDTO(jsonObj): void {
      if (jsonObj === null) { return; }
      if (jsonObj.usersName != null) { this.usersName = jsonObj.usersName; }
      if (jsonObj.roleIds != null) { this.roleIds = jsonObj.roleIds; }
      if (jsonObj.notification != null) { this.notification.PrepareDTO(jsonObj.notification); }
      if (jsonObj.id != null) { this.id = jsonObj.id; }
      if (jsonObj.cacheStamp != null) { this.cacheStamp = jsonObj.cacheStamp; }
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
