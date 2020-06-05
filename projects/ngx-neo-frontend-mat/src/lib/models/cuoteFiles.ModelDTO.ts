import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { CuoteFilesDTO } from './DTO/cuoteFiles.DTO';


export class CuoteFilesModelDTO extends EntityModelDTO<CuoteFilesDTO> {


   public constructor(protected entityDTO: CuoteFilesDTO) {
      super(entityDTO);
   }
   public setEntityDTO(entityDTO: CuoteFilesDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO == null) return;
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }
   public dispose(): void {
   }

   get TotalFiles(): number { return this.entityDTO.totalFiles; }
   set TotalFiles(value: number) { this.notifyChangeDTO('totalFiles', value); }

   get TotalCuote(): number { return this.entityDTO.totalCuote; }
   set TotalCuote(value: number) { this.notifyChangeDTO('totalCuote', value); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }
}
