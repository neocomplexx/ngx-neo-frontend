import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';
import { TypeSocial } from './typeSocial.ENUM';


export class AuthRequestDTO implements IEntityDTO {

   userName = '';
   password = '';
   typeSocial: TypeSocial;
   token = '';
   tokenId = '';

   constructor() {
   }

   public PrepareDTO(jsonObj): void {
      if (jsonObj === null) { return; }
      if (jsonObj.userName != null) { this.userName = jsonObj.userName; }
      if (jsonObj.password != null) { this.password = jsonObj.password; }
      if (jsonObj.typeSocial != null) { this.typeSocial = jsonObj.typeSocial as TypeSocial; }
      if (jsonObj.token != null) { this.token = jsonObj.token; }
      if (jsonObj.tokenId != null) { this.tokenId = jsonObj.tokenId; }
   }
}
