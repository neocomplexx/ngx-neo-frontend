import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { ImageEntityDTO } from './DTO/imageEntity.DTO';


export class ImageEntityModelDTO extends EntityModelDTO<ImageEntityDTO> {


   public constructor(protected entityDTO: ImageEntityDTO) {
      super(entityDTO);
   }
   public setEntityDTO(entityDTO: ImageEntityDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO == null) return;
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }
   public dispose(): void {
   }

   get Imagen(): string { return this.entityDTO.imagen; }
   set Imagen(value: string) { this.notifyChangeDTO('imagen', value); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }
}
