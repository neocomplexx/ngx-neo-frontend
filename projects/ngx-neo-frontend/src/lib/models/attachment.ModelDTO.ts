import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { AttachmentDTO } from './DTO/attachment.DTO';
import { AttachmentType } from './DTO/attachmentType.ENUM';
import { FileDBDTO } from './DTO/fileDB.DTO';
import { FileDBModelDTO } from './fileDB.ModelDTO';


export class AttachmentModelDTO extends EntityModelDTO<AttachmentDTO> {

   private _FileModel: FileDBModelDTO;
   private fileSubscribe: Subscription;

   public constructor(protected entityDTO: AttachmentDTO) {
      super(entityDTO);
   }
   public setEntityDTO(entityDTO: AttachmentDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO == null) return;
      this._FileModel = new FileDBModelDTO(this.entityDTO.file);
      this.fileSubscribe = this._FileModel.changed.subscribe((changed) => this.changed.next(changed));
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }
   public dispose(): void {
      this._FileModel.dispose();
      this.fileSubscribe.unsubscribe();
   }

   get Type(): string { return AttachmentType[this.entityDTO.type]; }
   set Type(value: string) { this.notifyChangeDTO('type', AttachmentType[value]); }

   get Name(): string { return this.entityDTO.name; }
   set Name(value: string) { this.notifyChangeDTO('name', value); }

   get PublicUrl(): string { return this.entityDTO.publicUrl; }
   set PublicUrl(value: string) { this.notifyChangeDTO('publicUrl', value); }

   get FileModel(): FileDBModelDTO { return this._FileModel; }
   get File(): FileDBDTO { return this._FileModel.getEntityDTO(); }
   set File(value: FileDBDTO) { this.notifyChange(() => { this.entityDTO.file = value; this._FileModel.setEntityDTO(value) }); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }

   public static getAttachmentType(): string[] {
      return EntityModelDTO.getEnumArray(AttachmentType);
   }
}
