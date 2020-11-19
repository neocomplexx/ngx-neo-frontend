import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { AuthRequestDTO } from './DTO/authRequest.DTO';
import { TypeSocial } from './DTO/typeSocial.ENUM';


export class AuthRequestModelDTO extends EntityModelDTO<AuthRequestDTO> {


   public constructor(protected entityDTO: AuthRequestDTO) {
      super(entityDTO);
   }

   public static getTypeSocial(): string[] {
      return EntityModelDTO.getEnumArray(TypeSocial);
   }

   public setEntityDTO(entityDTO: AuthRequestDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO === null) { return; }
   }

   public dispose(): void {
   }

   get UserName(): string { return this.entityDTO.userName; }
   set UserName(value: string) { this.notifyChangeDTO('userName', value); }

   get Password(): string { return this.entityDTO.password; }
   set Password(value: string) { this.notifyChangeDTO('password', value); }

   get TypeSocial(): string { return TypeSocial[this.entityDTO.typeSocial]; }
   set TypeSocial(value: string) { this.notifyChangeDTO('typeSocial', TypeSocial[value]); }

   get Token(): string { return this.entityDTO.token; }
   set Token(value: string) { this.notifyChangeDTO('token', value); }

   get TokenId(): string { return this.entityDTO.tokenId; }
   set TokenId(value: string) { this.notifyChangeDTO('tokenId', value); }
}
