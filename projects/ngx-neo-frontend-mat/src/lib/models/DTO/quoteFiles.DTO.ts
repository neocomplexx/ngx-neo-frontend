import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';

export class QuoteFilesDTO implements IEntityDTO {

   totalFiles: number = 0;
   totalQuote: number = 0;
   id: number = 0;
   cacheStamp: number = 0;

   constructor() {
   }

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj == null) return;
      if (jsonObj['totalFiles'] != null) this.totalFiles = jsonObj['totalFiles'];
      if (jsonObj['totalQuote'] != null) this.totalQuote = jsonObj['totalQuote'];
      if (jsonObj['id'] != null) this.id = jsonObj['id'];
      if (jsonObj['cacheStamp'] != null) this.cacheStamp = jsonObj['cacheStamp'];
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
