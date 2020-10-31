import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { TenantResponseDTO } from './DTO/tenantResponse.DTO';


export class TenantResponseModelDTO extends EntityModelDTO<TenantResponseDTO> {


   public constructor(protected entityDTO: TenantResponseDTO) {
      super(entityDTO);
   }

   public setEntityDTO(entityDTO: TenantResponseDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO === null) return;
   }

   public dispose(): void {
   }

   get Name(): string { return this.entityDTO.name; }
   set Name(value: string) { this.notifyChangeDTO('name', value); }

   get Image(): string { return this.entityDTO.image; }
   set Image(value: string) { this.notifyChangeDTO('image', value); }

   get Token(): string { return this.entityDTO.token; }
   set Token(value: string) { this.notifyChangeDTO('token', value); }

   get UserTypeId(): number { return this.entityDTO.userTypeId; }
   set UserTypeId(value: number) { this.notifyChangeDTO('userTypeId', value); }
}
