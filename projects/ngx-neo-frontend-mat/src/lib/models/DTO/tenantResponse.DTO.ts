import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';

export class TenantResponseDTO implements IEntityDTO {

   name = '';
   image = '';
   token = '';
   userTypeId: number;

   constructor() {
   }

   public PrepareDTO(jsonObj): void {
      if (jsonObj === null) { return; }
      if (jsonObj.name != null) { this.name = jsonObj.name; }
      if (jsonObj.image != null) { this.image = jsonObj.image; }
      if (jsonObj.token != null) { this.token = jsonObj.token; }
      if (jsonObj.userTypeId != null) { this.userTypeId = jsonObj.userTypeId; }
   }
}
