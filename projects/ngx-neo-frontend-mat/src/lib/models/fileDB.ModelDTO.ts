import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { FileDBDTO } from './DTO/fileDB.DTO';


export class FileDBModelDTO extends EntityModelDTO<FileDBDTO> {


   public constructor(protected entityDTO: FileDBDTO) {
      super(entityDTO);
   }
   public setEntityDTO(entityDTO: FileDBDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO == null) return;
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }
   public dispose(): void {
   }

   get CreationDate(): string { return this.dateToString(this.entityDTO.creationDate); }
   set CreationDate(value: string) {
      const date = this.stringToDate(value);
      if (date) { this.notifyChangeDTO('creationDate', date); }
   }

   get FileName(): string { return this.entityDTO.fileName; }
   set FileName(value: string) { this.notifyChangeDTO('fileName', value); }

   get MD5(): string { return this.entityDTO.mD5; }
   set MD5(value: string) { this.notifyChangeDTO('mD5', value); }

   get Path(): string { return this.entityDTO.path; }
   set Path(value: string) { this.notifyChangeDTO('path', value); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }
}
