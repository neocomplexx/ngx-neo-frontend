import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';
import { RoleState } from './roleState.ENUM';


export class RoleBasicDTO implements IEntityDTO {

   name = '';
   description = '';
   state: RoleState;
   needUserOwner: boolean;
   userType = 0;
   id = 0;
   cacheStamp = 0;

   constructor() {
   }

   public PrepareDTO(jsonObj): void {
      if (jsonObj === null) { return; }
      if (jsonObj.name != null) { this.name = jsonObj.name; }
      if (jsonObj.description != null) { this.description = jsonObj.description; }
      if (jsonObj.state != null) { this.state = jsonObj.state as RoleState; }
      if (jsonObj.needUserOwner != null) { this.needUserOwner = jsonObj.needUserOwner; }
      if (jsonObj.userType != null) { this.userType = jsonObj.userType; }
      if (jsonObj.id != null) { this.id = jsonObj.id; }
      if (jsonObj.cacheStamp != null) { this.cacheStamp = jsonObj.cacheStamp; }
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
