import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';

export class FileDBDTO implements IEntityDTO {

   creationDate: Date;
   fileName = '';
   size = 0;
   id = 0;
   cacheStamp = 0;

   constructor() {
   }

   public PrepareDTO(jsonObj): void {
      if (jsonObj === null) { return; }
      if (jsonObj.creationDate != null) { this.creationDate = new Date(jsonObj.creationDate); }
      if (jsonObj.fileName != null) { this.fileName = jsonObj.fileName; }
      if (jsonObj.size != null) { this.size = jsonObj.size; }
      if (jsonObj.id != null) { this.id = jsonObj.id; }
      if (jsonObj.cacheStamp != null) { this.cacheStamp = jsonObj.cacheStamp; }
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
