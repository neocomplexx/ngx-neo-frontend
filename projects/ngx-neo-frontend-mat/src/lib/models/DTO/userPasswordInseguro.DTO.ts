import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';

export class UserPasswordInseguroDTO implements IEntityDTO {

   userName = '';
   fullName = '';
   passwordInseguro: boolean;
   id = 0;
   cacheStamp = 0;

   constructor() {
   }

   public PrepareDTO(jsonObj): void {
      if (jsonObj === null) { return; }
      if (jsonObj.userName != null) { this.userName = jsonObj.userName; }
      if (jsonObj.fullName != null) { this.fullName = jsonObj.fullName; }
      if (jsonObj.passwordInseguro != null) { this.passwordInseguro = jsonObj.passwordInseguro; }
      if (jsonObj.id != null) { this.id = jsonObj.id; }
      if (jsonObj.cacheStamp != null) { this.cacheStamp = jsonObj.cacheStamp; }
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
