import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';
import { AttachmentType } from './attachmentType.ENUM';
import { AttachmentSignatureDTO } from './attachmentSignature.DTO';
import { UserDTO } from './user.DTO';
import { FileDBDTO } from './fileDB.DTO';


export class AttachmentDTO implements IEntityDTO {

   signatures: Array<AttachmentSignatureDTO>;
   type: AttachmentType;
   creatorUser: UserDTO;
   name = '';
   publicUrl = '';
   file: FileDBDTO;
   allowsDigitalSignature: boolean;
   id = 0;
   cacheStamp = 0;

   constructor() {
      this.signatures = new Array<AttachmentSignatureDTO>();
      this.creatorUser = new UserDTO();
      this.file = new FileDBDTO();
   }

   public PrepareDTO(jsonObj): void {
      if (jsonObj === null) { return; }
      if (jsonObj.signatures != null) { for (const item of jsonObj.signatures) { const itemDTO = new AttachmentSignatureDTO(); itemDTO.PrepareDTO(item); this.signatures.push(itemDTO); } }
      if (jsonObj.type != null) { this.type = jsonObj.type as AttachmentType; }
      if (jsonObj.creatorUser != null) { this.creatorUser.PrepareDTO(jsonObj.creatorUser); }
      if (jsonObj.name != null) { this.name = jsonObj.name; }
      if (jsonObj.publicUrl != null) { this.publicUrl = jsonObj.publicUrl; }
      if (jsonObj.file != null) { this.file.PrepareDTO(jsonObj.file); }
      if (jsonObj.allowsDigitalSignature != null) { this.allowsDigitalSignature = jsonObj.allowsDigitalSignature; }
      if (jsonObj.id != null) { this.id = jsonObj.id; }
      if (jsonObj.cacheStamp != null) { this.cacheStamp = jsonObj.cacheStamp; }
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
