import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';
 
export class FileDBDTO implements IEntityDTO {

   creationDate: Date;
   fileName: string = '';
   mD5: string = '';
   path: string = '';
   id: number = 0;
   cacheStamp: number = 0;

   constructor() {
   }

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj == null) return;
      if (jsonObj['creationDate'] != null) this.creationDate = new Date(jsonObj['creationDate']);
      if (jsonObj['fileName'] != null) this.fileName = jsonObj['fileName'];
      if (jsonObj['mD5'] != null) this.mD5 = jsonObj['mD5'];
      if (jsonObj['path'] != null) this.path = jsonObj['path'];
      if (jsonObj['id'] != null) this.id = jsonObj['id'];
      if (jsonObj['cacheStamp'] != null) this.cacheStamp = jsonObj['cacheStamp'];
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
