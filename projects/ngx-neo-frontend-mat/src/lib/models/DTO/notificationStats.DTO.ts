import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';
import { NotificationPriority } from './notificationPriority.ENUM';


export class NotificationStatsDTO implements IEntityDTO {

   title = '';
   details = '';
   userName = '';
   total = 0;
   read = 0;
   unread = 0;
   archived: boolean;
   date: Date;
   priority: NotificationPriority;
   withAttachments: boolean;
   id = 0;
   cacheStamp = 0;

   constructor() {
   }

   public PrepareDTO(jsonObj): void {
      if (jsonObj === null) { return; }
      if (jsonObj.title != null) { this.title = jsonObj.title; }
      if (jsonObj.details != null) { this.details = jsonObj.details; }
      if (jsonObj.userName != null) { this.userName = jsonObj.userName; }
      if (jsonObj.total != null) { this.total = jsonObj.total; }
      if (jsonObj.read != null) { this.read = jsonObj.read; }
      if (jsonObj.unread != null) { this.unread = jsonObj.unread; }
      if (jsonObj.archived != null) { this.archived = jsonObj.archived; }
      if (jsonObj.date != null) { this.date = new Date(jsonObj.date); }
      if (jsonObj.priority != null) { this.priority = jsonObj.priority as NotificationPriority; }
      if (jsonObj.withAttachments != null) { this.withAttachments = jsonObj.withAttachments; }
      if (jsonObj.id != null) { this.id = jsonObj.id; }
      if (jsonObj.cacheStamp != null) { this.cacheStamp = jsonObj.cacheStamp; }
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
