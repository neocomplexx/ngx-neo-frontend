import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { NeoCompanyWithAuthTokenDTO } from './DTO/neoCompanyWithAuthToken.DTO';


export class NeoCompanyWithAuthTokenModelDTO extends EntityModelDTO<NeoCompanyWithAuthTokenDTO> {


   public constructor(protected entityDTO: NeoCompanyWithAuthTokenDTO) {
      super(entityDTO);
   }

   public setEntityDTO(entityDTO: NeoCompanyWithAuthTokenDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO === null) return;
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }

   public dispose(): void {
   }

   get Token(): string { return this.entityDTO.token; }
   set Token(value: string) { this.notifyChangeDTO('token', value); }

   get Brand(): string { return this.entityDTO.brand; }
   set Brand(value: string) { this.notifyChangeDTO('brand', value); }

   get CompanyName(): string { return this.entityDTO.companyName; }
   set CompanyName(value: string) { this.notifyChangeDTO('companyName', value); }

   get TaxID(): string { return this.entityDTO.taxID; }
   set TaxID(value: string) { this.notifyChangeDTO('taxID', value); }

   get Subsidiary(): number { return this.entityDTO.subsidiary; }
   set Subsidiary(value: number) { this.notifyChangeDTO('subsidiary', value); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }
}
