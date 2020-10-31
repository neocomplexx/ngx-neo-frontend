import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';
import { TenantResponseDTO } from './tenantResponse.DTO';


export class AuthTenantsResponseDTO implements IEntityDTO {

   id = 0;
   userName = '';
   firstName = '';
   lastName = '';
   fullName = '';
   active: boolean;
   userType = '';
   image = '';
   tenants: Array<TenantResponseDTO>;

   constructor() {
      this.tenants = new Array<TenantResponseDTO>();
   }

   public PrepareDTO(jsonObj): void {
      if (jsonObj === null) { return; }
      if (jsonObj.id != null) { this.id = jsonObj.id; }
      if (jsonObj.userName != null) { this.userName = jsonObj.userName; }
      if (jsonObj.firstName != null) { this.firstName = jsonObj.firstName; }
      if (jsonObj.lastName != null) { this.lastName = jsonObj.lastName; }
      if (jsonObj.fullName != null) { this.fullName = jsonObj.fullName; }
      if (jsonObj.active != null) { this.active = jsonObj.active; }
      if (jsonObj.userType != null) { this.userType = jsonObj.userType; }
      if (jsonObj.image != null) { this.image = jsonObj.image; }
      if (jsonObj.tenants != null) { for (const item of jsonObj.tenants) { const itemDTO = new TenantResponseDTO(); itemDTO.PrepareDTO(item); this.tenants.push(itemDTO); } }
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
