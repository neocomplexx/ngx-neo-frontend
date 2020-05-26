import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';
import { NotificationPriority } from './notificationPriority.ENUM';


export class NotificationStatsDTO implements IEntityDTO {

   title: string = '';
   details: string = '';
   userName: string = '';
   total: number = 0;
   read: number = 0;
   unread: number = 0;
   date: Date;
   priority: NotificationPriority;
   id: number = 0;
   cacheStamp: number = 0;

   constructor() {
   }

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj == null) return;
      if (jsonObj['title'] != null) this.title = jsonObj['title'];
      if (jsonObj['details'] != null) this.details = jsonObj['details'];
      if (jsonObj['userName'] != null) this.userName = jsonObj['userName'];
      if (jsonObj['total'] != null) this.total = jsonObj['total'];
      if (jsonObj['read'] != null) this.read = jsonObj['read'];
      if (jsonObj['unread'] != null) this.unread = jsonObj['unread'];
      if (jsonObj['date'] != null) this.date = new Date(jsonObj['date']);
      if (jsonObj['priority'] != null) this.priority = jsonObj['priority'] as NotificationPriority;
      if (jsonObj['id'] != null) this.id = jsonObj['id'];
      if (jsonObj['cacheStamp'] != null) this.cacheStamp = jsonObj['cacheStamp'];
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
