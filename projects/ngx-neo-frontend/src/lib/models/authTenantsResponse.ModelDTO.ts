import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { AuthTenantsResponseDTO } from './DTO/authTenantsResponse.DTO';
import { TenantResponseDTO } from './DTO/tenantResponse.DTO';
import { TenantResponseModelDTO } from './tenantResponse.ModelDTO';


export class AuthTenantsResponseModelDTO extends EntityModelDTO<AuthTenantsResponseDTO> {


   public constructor(protected entityDTO: AuthTenantsResponseDTO) {
      super(entityDTO);
   }
   public setEntityDTO(entityDTO: AuthTenantsResponseDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO == null) return;
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }
   public dispose(): void {
   }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get UserName(): string { return this.entityDTO.userName; }
   set UserName(value: string) { this.notifyChangeDTO('userName', value); }

   get FirstName(): string { return this.entityDTO.firstName; }
   set FirstName(value: string) { this.notifyChangeDTO('firstName', value); }

   get LastName(): string { return this.entityDTO.lastName; }
   set LastName(value: string) { this.notifyChangeDTO('lastName', value); }

   get FullName(): string { return this.entityDTO.fullName; }
   set FullName(value: string) { this.notifyChangeDTO('fullName', value); }

   get Active(): boolean { return this.entityDTO.active; }
   set Active(value: boolean) { this.notifyChangeDTO('active', value); }

   get UserType(): string { return this.entityDTO.userType; }
   set UserType(value: string) { this.notifyChangeDTO('userType', value); }

   get Image(): string { return this.entityDTO.image; }
   set Image(value: string) { this.notifyChangeDTO('image', value); }

   get Tenants(): Array<TenantResponseDTO> { return this.entityDTO.tenants; }
   set Tenants(value: Array<TenantResponseDTO>) { this.notifyChangeDTO('tenants', value); }
}
