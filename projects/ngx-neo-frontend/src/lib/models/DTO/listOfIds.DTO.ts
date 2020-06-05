import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';

export class ListOfIdsDTO implements IEntityDTO {

   ids: Array<number>;
   id: number = 0;
   cacheStamp: number = 0;

   constructor() {
   }

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj == null) return;
      if (jsonObj['ids'] != null) this.ids = jsonObj['ids'];
      if (jsonObj['id'] != null) this.id = jsonObj['id'];
      if (jsonObj['cacheStamp'] != null) this.cacheStamp = jsonObj['cacheStamp'];
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
