import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';
 
export class AuthResponseDTO implements IEntityDTO {

   id: number = 0;
   token: string = '';
   userName: string = '';
   firstName: string = '';
   lastName: string = '';
   fullName: string = '';
   email: string = '';
   active: boolean;
   userType: string = '';
   userTypeId: number = 0;
   lastServiceChangeId: number = 0;
   image: string = '';
   role: Object;
   isViewUser: boolean;
   termsAccepted: boolean;
   validEmail: boolean;

   constructor() {
   }

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj == null) return;
      if (jsonObj['id'] != null) this.id = jsonObj['id'];
      if (jsonObj['token'] != null) this.token = jsonObj['token'];
      if (jsonObj['userName'] != null) this.userName = jsonObj['userName'];
      if (jsonObj['firstName'] != null) this.firstName = jsonObj['firstName'];
      if (jsonObj['lastName'] != null) this.lastName = jsonObj['lastName'];
      if (jsonObj['fullName'] != null) this.fullName = jsonObj['fullName'];
      if (jsonObj['email'] != null) this.email = jsonObj['email'];
      if (jsonObj['active'] != null) this.active = jsonObj['active'];
      if (jsonObj['userType'] != null) this.userType = jsonObj['userType'];
      if (jsonObj['userTypeId'] != null) this.userTypeId = jsonObj['userTypeId'];
      if (jsonObj['lastServiceChangeId'] != null) this.lastServiceChangeId = jsonObj['lastServiceChangeId'];
      if (jsonObj['image'] != null) this.image = jsonObj['image'];
      if (jsonObj['role'] != null) this.role = jsonObj['role'];
      if (jsonObj['isViewUser'] != null) this.isViewUser = jsonObj['isViewUser'];
      if (jsonObj['termsAccepted'] != null) this.termsAccepted = jsonObj['termsAccepted'];
      if (jsonObj['validEmail'] != null) this.validEmail = jsonObj['validEmail'];
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
