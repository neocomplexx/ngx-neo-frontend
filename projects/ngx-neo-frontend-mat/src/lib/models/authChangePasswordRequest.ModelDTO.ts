import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { AuthChangePasswordRequestDTO } from './DTO/authChangePasswordRequest.DTO';
import { TypeSocial } from './DTO/typeSocial.ENUM';


export class AuthChangePasswordRequestModelDTO extends EntityModelDTO<AuthChangePasswordRequestDTO> {


   public constructor(protected entityDTO: AuthChangePasswordRequestDTO) {
      super(entityDTO);
   }

   public static getTypeSocial(): string[] {
      return EntityModelDTO.getEnumArray(TypeSocial);
   }

   public setEntityDTO(entityDTO: AuthChangePasswordRequestDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO === null) return;
   }

   public dispose(): void {
   }

   get OldPassword(): string { return this.entityDTO.oldPassword; }
   set OldPassword(value: string) { this.notifyChangeDTO('oldPassword', value); }

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
