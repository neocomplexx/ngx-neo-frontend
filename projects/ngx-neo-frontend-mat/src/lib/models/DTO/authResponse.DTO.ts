import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';

export class AuthResponseDTO implements IEntityDTO {

   id = 0;
   token = '';
   userName = '';
   firstName = '';
   lastName = '';
   fullName = '';
   email = '';
   active: boolean;
   userType = '';
   userTypeId = 0;
   lastServiceChangeId = 0;
   image = '';
   role: Object;
   isViewUser: boolean;
   termsAccepted: boolean;
   validEmail: boolean;
   ownCode = '';
   hasMoreAccounts: boolean;

   constructor() {
   }

   public PrepareDTO(jsonObj): void {
      if (jsonObj === null) { return; }
      if (jsonObj.id != null) { this.id = jsonObj.id; }
      if (jsonObj.token != null) { this.token = jsonObj.token; }
      if (jsonObj.userName != null) { this.userName = jsonObj.userName; }
      if (jsonObj.firstName != null) { this.firstName = jsonObj.firstName; }
      if (jsonObj.lastName != null) { this.lastName = jsonObj.lastName; }
      if (jsonObj.fullName != null) { this.fullName = jsonObj.fullName; }
      if (jsonObj.email != null) { this.email = jsonObj.email; }
      if (jsonObj.active != null) { this.active = jsonObj.active; }
      if (jsonObj.userType != null) { this.userType = jsonObj.userType; }
      if (jsonObj.userTypeId != null) { this.userTypeId = jsonObj.userTypeId; }
      if (jsonObj.lastServiceChangeId != null) { this.lastServiceChangeId = jsonObj.lastServiceChangeId; }
      if (jsonObj.image != null) { this.image = jsonObj.image; }
      if (jsonObj.role != null) { this.role = jsonObj.role; }
      if (jsonObj.isViewUser != null) { this.isViewUser = jsonObj.isViewUser; }
      if (jsonObj.termsAccepted != null) { this.termsAccepted = jsonObj.termsAccepted; }
      if (jsonObj.validEmail != null) { this.validEmail = jsonObj.validEmail; }
      if (jsonObj.ownCode != null) { this.ownCode = jsonObj.ownCode; }
      if (jsonObj.hasMoreAccounts != null) { this.hasMoreAccounts = jsonObj.hasMoreAccounts; }
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
