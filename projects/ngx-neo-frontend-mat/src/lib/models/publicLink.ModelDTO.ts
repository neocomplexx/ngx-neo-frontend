import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { PublicLinkDTO } from './DTO/publicLink.DTO';


export class PublicLinkModelDTO extends EntityModelDTO<PublicLinkDTO> {


   public constructor(protected entityDTO: PublicLinkDTO) {
      super(entityDTO);
   }

   public setEntityDTO(entityDTO: PublicLinkDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO === null) { return; }
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }

   public dispose(): void {
   }

   get Link(): string { return this.entityDTO.link; }
   set Link(value: string) { this.notifyChangeDTO('link', value); }

   get Expired(): Date { return this.entityDTO.expired; }
   set Expired(value: Date) { this.notifyChangeDTO('expired', value); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }
}
