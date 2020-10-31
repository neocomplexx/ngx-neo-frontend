import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';
import { UserState } from './userState.ENUM';


export class AuthEditUserRequestDTO implements IEntityDTO {

   firstName = '';
   lastName = '';
   userName = '';
   idRole = 0;
   idUserOwner = 0;
   state: UserState;

   constructor() {
   }

   public PrepareDTO(jsonObj): void {
      if (jsonObj === null) { return; }
      if (jsonObj.firstName != null) { this.firstName = jsonObj.firstName; }
      if (jsonObj.lastName != null) { this.lastName = jsonObj.lastName; }
      if (jsonObj.userName != null) { this.userName = jsonObj.userName; }
      if (jsonObj.idRole != null) { this.idRole = jsonObj.idRole; }
      if (jsonObj.idUserOwner != null) { this.idUserOwner = jsonObj.idUserOwner; }
      if (jsonObj.state != null) { this.state = jsonObj.state as UserState; }
   }
}
