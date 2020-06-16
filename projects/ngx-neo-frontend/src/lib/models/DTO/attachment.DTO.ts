import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';
import { AttachmentType } from './attachmentType.ENUM';
import { FileDBDTO } from './fileDB.DTO';


export class AttachmentDTO implements IEntityDTO {

   type: AttachmentType;
   name: string = '';
   publicUrl: string = '';
   file: FileDBDTO;
   id: number = 0;
   cacheStamp: number = 0;

   constructor() {
      this.file = new FileDBDTO();
   }

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj == null) return;
      if (jsonObj['type'] != null) this.type = jsonObj['type'] as AttachmentType;
      if (jsonObj['name'] != null) this.name = jsonObj['name'];
      if (jsonObj['publicUrl'] != null) this.publicUrl = jsonObj['publicUrl'];
      if (jsonObj['file'] != null) this.file.PrepareDTO(jsonObj['file']);
      if (jsonObj['id'] != null) this.id = jsonObj['id'];
      if (jsonObj['cacheStamp'] != null) this.cacheStamp = jsonObj['cacheStamp'];
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
