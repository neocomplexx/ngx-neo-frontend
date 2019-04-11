import { IEntityDTO } from './entity.DTO';
import { TypeSocial } from './typeSocial.ENUM';

export class AuthChangePasswordRequestDTO implements IEntityDTO {

   oldPassword: string = '';
   userName: string = '';
   password: string = '';
   typeSocial: TypeSocial;
   token: string = '';
   tokenId: string = '';

   constructor() {
   }

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj == null) return;
      if (jsonObj['oldPassword'] != null) this.oldPassword = jsonObj['oldPassword'];
      if (jsonObj['userName'] != null) this.userName = jsonObj['userName'];
      if (jsonObj['password'] != null) this.password = jsonObj['password'];
      if (jsonObj['typeSocial'] != null) this.typeSocial = jsonObj['typeSocial'] as TypeSocial;
      if (jsonObj['token'] != null) this.token = jsonObj['token'];
      if (jsonObj['tokenId'] != null) this.tokenId = jsonObj['tokenId'];
   }
}
