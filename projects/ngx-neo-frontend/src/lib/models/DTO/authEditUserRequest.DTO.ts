import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';

export class AuthEditUserRequestDTO implements IEntityDTO {

   firstName: string = '';
   lastName: string = '';
   userName: string = '';
   idRole: number = 0;
   idUserOwner: number = 0;

   constructor() {
   }

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj == null) return;
      if (jsonObj['firstName'] != null) this.firstName = jsonObj['firstName'];
      if (jsonObj['lastName'] != null) this.lastName = jsonObj['lastName'];
      if (jsonObj['userName'] != null) this.userName = jsonObj['userName'];
      if (jsonObj['idRole'] != null) this.idRole = jsonObj['idRole'];
      if (jsonObj['idUserOwner'] != null) this.idUserOwner = jsonObj['idUserOwner'];
   }
}
