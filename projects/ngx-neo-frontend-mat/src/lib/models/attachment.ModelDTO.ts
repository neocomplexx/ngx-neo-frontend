import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { AttachmentDTO } from './DTO/attachment.DTO';
import { AttachmentSignatureDTO } from './DTO/attachmentSignature.DTO';
import { AttachmentSignatureModelDTO } from './attachmentSignature.ModelDTO';
import { AttachmentType } from './DTO/attachmentType.ENUM';
import { UserBasicDTO } from './DTO/userBasic.DTO';
import { UserBasicModelDTO } from './userBasic.ModelDTO';
import { FileDBDTO } from './DTO/fileDB.DTO';
import { FileDBModelDTO } from './fileDB.ModelDTO';


export class AttachmentModelDTO extends EntityModelDTO<AttachmentDTO> {

   private creatorUserModel: UserBasicModelDTO;
   private creatorUserSubscribe: Subscription;
   private fileModel: FileDBModelDTO;
   private fileSubscribe: Subscription;

   public constructor(protected entityDTO: AttachmentDTO) {
      super(entityDTO);
   }

   public static getAttachmentType(): string[] {
      return EntityModelDTO.getEnumArray(AttachmentType);
   }

   public setEntityDTO(entityDTO: AttachmentDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO === null) { return; }
      this.creatorUserModel = new UserBasicModelDTO(this.entityDTO.creatorUser);
      this.creatorUserSubscribe = this.creatorUserModel.changed.subscribe((changed) => this.changed.next(changed));
      this.fileModel = new FileDBModelDTO(this.entityDTO.file);
      this.fileSubscribe = this.fileModel.changed.subscribe((changed) => this.changed.next(changed));
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }

   public dispose(): void {
      this.creatorUserModel.dispose();
      this.creatorUserSubscribe.unsubscribe();
      this.fileModel.dispose();
      this.fileSubscribe.unsubscribe();
   }

   get Signatures(): Array<AttachmentSignatureDTO> { return this.entityDTO.signatures; }
   set Signatures(value: Array<AttachmentSignatureDTO>) { this.notifyChangeDTO('signatures', value); }

   get Type(): string { return AttachmentType[this.entityDTO.type]; }
   set Type(value: string) { this.notifyChangeDTO('type', AttachmentType[value]); }

   get CreatorUserModel(): UserBasicModelDTO { return this.creatorUserModel; }
   get CreatorUser(): UserBasicDTO { return this.creatorUserModel.getEntityDTO(); }
   set CreatorUser(value: UserBasicDTO) { this.notifyChange(() => { this.entityDTO.creatorUser = value; this.creatorUserModel.setEntityDTO(value); }); }

   get Name(): string { return this.entityDTO.name; }
   set Name(value: string) { this.notifyChangeDTO('name', value); }

   get PublicUrl(): string { return this.entityDTO.publicUrl; }
   set PublicUrl(value: string) { this.notifyChangeDTO('publicUrl', value); }

   get FileModel(): FileDBModelDTO { return this.fileModel; }
   get File(): FileDBDTO { return this.fileModel.getEntityDTO(); }
   set File(value: FileDBDTO) { this.notifyChange(() => { this.entityDTO.file = value; this.fileModel.setEntityDTO(value); }); }

   get AllowsDigitalSignature(): boolean { return this.entityDTO.allowsDigitalSignature; }
   set AllowsDigitalSignature(value: boolean) { this.notifyChangeDTO('allowsDigitalSignature', value); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }
}
