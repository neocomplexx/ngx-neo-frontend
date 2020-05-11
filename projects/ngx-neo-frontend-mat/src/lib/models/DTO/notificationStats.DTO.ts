import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';

export class NotificationStatsDTO implements IEntityDTO {

   title: string = '';
   total: number = 0;
   read: number = 0;
   unread: number = 0;
   id: number = 0;
   cacheStamp: number = 0;

   constructor() {
   }

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj == null) return;
      if (jsonObj['title'] != null) this.title = jsonObj['title'];
      if (jsonObj['total'] != null) this.total = jsonObj['total'];
      if (jsonObj['read'] != null) this.read = jsonObj['read'];
      if (jsonObj['unread'] != null) this.unread = jsonObj['unread'];
      if (jsonObj['id'] != null) this.id = jsonObj['id'];
      if (jsonObj['cacheStamp'] != null) this.cacheStamp = jsonObj['cacheStamp'];
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
