import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';
import { AttachmentDTO } from './attachment.DTO';
import { NotificationPriority } from './notificationPriority.ENUM';
import { NotificationState } from './notificationState.ENUM';


export class NotificationAttachmentsDTO implements IEntityDTO {

   attachments: Array<AttachmentDTO>;
   userName: string = '';
   priority: NotificationPriority;
   notificationType: number = 0;
   state: NotificationState;
   creationDateTime: Date;
   readDateTime: Date;
   title: string = '';
   notShowInMenu: boolean;
   details: string = '';
   serviceNotify: string = '';
   service: string = '';
   serviceId: number = 0;
   serviceId2: number = 0;
   id: number = 0;
   cacheStamp: number = 0;

   constructor() {
      this.attachments = new Array<AttachmentDTO>();
   }

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj == null) return;
      if (jsonObj['attachments'] != null) for (const item of jsonObj['attachments']) { const itemDTO = new AttachmentDTO(); itemDTO.PrepareDTO(item); this.attachments.push(itemDTO); }
      if (jsonObj['userName'] != null) this.userName = jsonObj['userName'];
      if (jsonObj['priority'] != null) this.priority = jsonObj['priority'] as NotificationPriority;
      if (jsonObj['notificationType'] != null) this.notificationType = jsonObj['notificationType'];
      if (jsonObj['state'] != null) this.state = jsonObj['state'] as NotificationState;
      if (jsonObj['creationDateTime'] != null) this.creationDateTime = new Date(jsonObj['creationDateTime']);
      if (jsonObj['readDateTime'] != null) this.readDateTime = new Date(jsonObj['readDateTime']);
      if (jsonObj['title'] != null) this.title = jsonObj['title'];
      if (jsonObj['notShowInMenu'] != null) this.notShowInMenu = jsonObj['notShowInMenu'];
      if (jsonObj['details'] != null) this.details = jsonObj['details'];
      if (jsonObj['serviceNotify'] != null) this.serviceNotify = jsonObj['serviceNotify'];
      if (jsonObj['service'] != null) this.service = jsonObj['service'];
      if (jsonObj['serviceId'] != null) this.serviceId = jsonObj['serviceId'];
      if (jsonObj['serviceId2'] != null) this.serviceId2 = jsonObj['serviceId2'];
      if (jsonObj['id'] != null) this.id = jsonObj['id'];
      if (jsonObj['cacheStamp'] != null) this.cacheStamp = jsonObj['cacheStamp'];
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
