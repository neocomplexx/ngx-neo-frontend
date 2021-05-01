import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { AuthResponseDTO } from './DTO/authResponse.DTO';


export class AuthResponseModelDTO extends EntityModelDTO<AuthResponseDTO> {


   public constructor(protected entityDTO: AuthResponseDTO) {
      super(entityDTO);
   }

   public setEntityDTO(entityDTO: AuthResponseDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO === null) { return; }
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }

   public dispose(): void {
   }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get Token(): string { return this.entityDTO.token; }
   set Token(value: string) { this.notifyChangeDTO('token', value); }

   get UserName(): string { return this.entityDTO.userName; }
   set UserName(value: string) { this.notifyChangeDTO('userName', value); }

   get FirstName(): string { return this.entityDTO.firstName; }
   set FirstName(value: string) { this.notifyChangeDTO('firstName', value); }

   get LastName(): string { return this.entityDTO.lastName; }
   set LastName(value: string) { this.notifyChangeDTO('lastName', value); }

   get FullName(): string { return this.entityDTO.fullName; }
   set FullName(value: string) { this.notifyChangeDTO('fullName', value); }

   get Email(): string { return this.entityDTO.email; }
   set Email(value: string) { this.notifyChangeDTO('email', value); }

   get Active(): boolean { return this.entityDTO.active; }
   set Active(value: boolean) { this.notifyChangeDTO('active', value); }

   get UserType(): string { return this.entityDTO.userType; }
   set UserType(value: string) { this.notifyChangeDTO('userType', value); }

   get UserTypeId(): number { return this.entityDTO.userTypeId; }
   set UserTypeId(value: number) { this.notifyChangeDTO('userTypeId', value); }

   get LastServiceChangeId(): number { return this.entityDTO.lastServiceChangeId; }
   set LastServiceChangeId(value: number) { this.notifyChangeDTO('lastServiceChangeId', value); }

   get Image(): string { return this.entityDTO.image; }
   set Image(value: string) { this.notifyChangeDTO('image', value); }

   get Role(): Object { return this.entityDTO.role; }
   set Role(value: Object) { this.notifyChangeDTO('role', value); }

   get IsViewUser(): boolean { return this.entityDTO.isViewUser; }
   set IsViewUser(value: boolean) { this.notifyChangeDTO('isViewUser', value); }

   get TermsAccepted(): boolean { return this.entityDTO.termsAccepted; }
   set TermsAccepted(value: boolean) { this.notifyChangeDTO('termsAccepted', value); }

   get ValidEmail(): boolean { return this.entityDTO.validEmail; }
   set ValidEmail(value: boolean) { this.notifyChangeDTO('validEmail', value); }

   get OwnCode(): string { return this.entityDTO.ownCode; }
   set OwnCode(value: string) { this.notifyChangeDTO('ownCode', value); }

   get HasMoreAccounts(): boolean { return this.entityDTO.hasMoreAccounts; }
   set HasMoreAccounts(value: boolean) { this.notifyChangeDTO('hasMoreAccounts', value); }
}
