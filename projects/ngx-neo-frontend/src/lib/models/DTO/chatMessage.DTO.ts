import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';
 
export class ChatMessageDTO implements IEntityDTO {

   from: string = '';
   to: string = '';
   creationDate: Date;
   receptionDate: Date;
   readDate: Date;
   message: string = '';
   id: number = 0;
   cacheStamp: number = 0;

   constructor() {
   }

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj == null) return;
      if (jsonObj['from'] != null) this.from = jsonObj['from'];
      if (jsonObj['to'] != null) this.to = jsonObj['to'];
      if (jsonObj['creationDate'] != null) this.creationDate = new Date(jsonObj['creationDate']);
      if (jsonObj['receptionDate'] != null) this.receptionDate = new Date(jsonObj['receptionDate']);
      if (jsonObj['readDate'] != null) this.readDate = new Date(jsonObj['readDate']);
      if (jsonObj['message'] != null) this.message = jsonObj['message'];
      if (jsonObj['id'] != null) this.id = jsonObj['id'];
      if (jsonObj['cacheStamp'] != null) this.cacheStamp = jsonObj['cacheStamp'];
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
