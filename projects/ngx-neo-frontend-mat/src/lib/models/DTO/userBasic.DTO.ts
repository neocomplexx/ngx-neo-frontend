import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';
import { UserState } from './userState.ENUM';
import { UserTypes } from './userTypes.ENUM';


export class UserBasicDTO implements IEntityDTO {

   userName = '';
   firstName = '';
   lastName = '';
   fullName = '';
   email = '';
   state: UserState;
   roleName = '';
   userType: UserTypes;
   image = '';
   id = 0;
   cacheStamp = 0;

   constructor() {
   }

   public PrepareDTO(jsonObj): void {
      if (jsonObj === null) { return; }
      if (jsonObj.userName != null) { this.userName = jsonObj.userName; }
      if (jsonObj.firstName != null) { this.firstName = jsonObj.firstName; }
      if (jsonObj.lastName != null) { this.lastName = jsonObj.lastName; }
      if (jsonObj.fullName != null) { this.fullName = jsonObj.fullName; }
      if (jsonObj.email != null) { this.email = jsonObj.email; }
      if (jsonObj.state != null) { this.state = jsonObj.state as UserState; }
      if (jsonObj.roleName != null) { this.roleName = jsonObj.roleName; }
      if (jsonObj.userType != null) { this.userType = jsonObj.userType as UserTypes; }
      if (jsonObj.image != null) { this.image = jsonObj.image; }
      if (jsonObj.id != null) { this.id = jsonObj.id; }
      if (jsonObj.cacheStamp != null) { this.cacheStamp = jsonObj.cacheStamp; }
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
