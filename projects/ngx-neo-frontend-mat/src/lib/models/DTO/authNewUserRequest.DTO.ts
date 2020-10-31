import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';
import { UserState } from './userState.ENUM';


export class AuthNewUserRequestDTO implements IEntityDTO {

   firstName = '';
   lastName = '';
   userName = '';
   password = '';
   idRole = 0;
   idUserOwner = 0;
   email = '';
   recaptchaToken = '';
   state: UserState;

   constructor() {
   }

   public PrepareDTO(jsonObj): void {
      if (jsonObj === null) { return; }
      if (jsonObj.firstName != null) { this.firstName = jsonObj.firstName; }
      if (jsonObj.lastName != null) { this.lastName = jsonObj.lastName; }
      if (jsonObj.userName != null) { this.userName = jsonObj.userName; }
      if (jsonObj.password != null) { this.password = jsonObj.password; }
      if (jsonObj.idRole != null) { this.idRole = jsonObj.idRole; }
      if (jsonObj.idUserOwner != null) { this.idUserOwner = jsonObj.idUserOwner; }
      if (jsonObj.email != null) { this.email = jsonObj.email; }
      if (jsonObj.recaptchaToken != null) { this.recaptchaToken = jsonObj.recaptchaToken; }
      if (jsonObj.state != null) { this.state = jsonObj.state as UserState; }
   }
}
