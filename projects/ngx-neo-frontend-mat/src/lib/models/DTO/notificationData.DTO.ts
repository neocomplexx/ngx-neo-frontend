import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';
import { NotificationDTO } from './notification.DTO';


export class NotificationDataDTO implements IEntityDTO {

   notificationsNotSeen = 0;
   data: Array<NotificationDTO>;
   total = 0;
   cacheStamp = 0;

   constructor() {
      this.data = new Array<NotificationDTO>();
   }

   public PrepareDTO(jsonObj): void {
      if (jsonObj === null) { return; }
      if (jsonObj.notificationsNotSeen != null) { this.notificationsNotSeen = jsonObj.notificationsNotSeen; }
      if (jsonObj.data != null) { for (const item of jsonObj.data) { const itemDTO = new NotificationDTO(); itemDTO.PrepareDTO(item); this.data.push(itemDTO); } }
      if (jsonObj.total != null) { this.total = jsonObj.total; }
      if (jsonObj.cacheStamp != null) { this.cacheStamp = jsonObj.cacheStamp; }
   }
}
