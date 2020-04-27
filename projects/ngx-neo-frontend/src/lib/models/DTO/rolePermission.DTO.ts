import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';
import { RolePermissionState } from './rolePermissionState.ENUM';
import { PermissionDTO } from './permission.DTO';


export class RolePermissionDTO implements IEntityDTO {

   permission: PermissionDTO;
   state: RolePermissionState;
   id: number = 0;
   cacheStamp: number = 0;

   constructor() {
      this.permission = new PermissionDTO();
   }

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj == null) return;
      if (jsonObj['permission'] != null) this.permission.PrepareDTO(jsonObj['permission']);
      if (jsonObj['state'] != null) this.state = jsonObj['state'] as RolePermissionState;
      if (jsonObj['id'] != null) this.id = jsonObj['id'];
      if (jsonObj['cacheStamp'] != null) this.cacheStamp = jsonObj['cacheStamp'];
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
