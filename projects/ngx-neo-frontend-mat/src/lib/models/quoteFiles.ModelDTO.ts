import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { QuoteFilesDTO } from './DTO/quoteFiles.DTO';


export class QuoteFilesModelDTO extends EntityModelDTO<QuoteFilesDTO> {


   public constructor(protected entityDTO: QuoteFilesDTO) {
      super(entityDTO);
   }

   public setEntityDTO(entityDTO: QuoteFilesDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO === null) return;
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }

   public dispose(): void {
   }

   get TotalFiles(): number { return this.entityDTO.totalFiles; }
   set TotalFiles(value: number) { this.notifyChangeDTO('totalFiles', value); }

   get TotalQuote(): number { return this.entityDTO.totalQuote; }
   set TotalQuote(value: number) { this.notifyChangeDTO('totalQuote', value); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }
}
