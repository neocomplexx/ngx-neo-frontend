import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';
import { UserDTO } from './user.DTO';
import { AttachmentDTO } from './attachment.DTO';


export class MessageDTO implements IEntityDTO {

   creationDate: Date;
   receptionDate: Date;
   readDate: Date;
   read: boolean;
   archived: boolean;
   sender: UserDTO;
   receivers: Array<UserDTO>;
   subject: string = '';
   body: string = '';
   attachments: Array<AttachmentDTO>;
   id: number = 0;
   cacheStamp: number = 0;

   constructor() {
      this.sender = new UserDTO();
      this.receivers = new Array<UserDTO>();
      this.attachments = new Array<AttachmentDTO>();
   }

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj == null) return;
      if (jsonObj['creationDate'] != null) this.creationDate = new Date(jsonObj['creationDate']);
      if (jsonObj['receptionDate'] != null) this.receptionDate = new Date(jsonObj['receptionDate']);
      if (jsonObj['readDate'] != null) this.readDate = new Date(jsonObj['readDate']);
      if (jsonObj['read'] != null) this.read = jsonObj['read'];
      if (jsonObj['archived'] != null) this.archived = jsonObj['archived'];
      if (jsonObj['sender'] != null) this.sender.PrepareDTO(jsonObj['sender']);
      if (jsonObj['receivers'] != null) for (const item of jsonObj['receivers']) { const itemDTO = new UserDTO(); itemDTO.PrepareDTO(item); this.receivers.push(itemDTO); }
      if (jsonObj['subject'] != null) this.subject = jsonObj['subject'];
      if (jsonObj['body'] != null) this.body = jsonObj['body'];
      if (jsonObj['attachments'] != null) for (const item of jsonObj['attachments']) { const itemDTO = new AttachmentDTO(); itemDTO.PrepareDTO(item); this.attachments.push(itemDTO); }
      if (jsonObj['id'] != null) this.id = jsonObj['id'];
      if (jsonObj['cacheStamp'] != null) this.cacheStamp = jsonObj['cacheStamp'];
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
