import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';
import { PermissionDTO } from './permission.DTO';


export class UpdatePermissionsDTO implements IEntityDTO {

   permissions: Array<PermissionDTO>;
   id = 0;
   cacheStamp = 0;

   constructor() {
      this.permissions = new Array<PermissionDTO>();
   }

   public PrepareDTO(jsonObj): void {
      if (jsonObj === null) { return; }
      if (jsonObj.permissions != null) { for (const item of jsonObj.permissions) { const itemDTO = new PermissionDTO(); itemDTO.PrepareDTO(item); this.permissions.push(itemDTO); } }
      if (jsonObj.id != null) { this.id = jsonObj.id; }
      if (jsonObj.cacheStamp != null) { this.cacheStamp = jsonObj.cacheStamp; }
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
