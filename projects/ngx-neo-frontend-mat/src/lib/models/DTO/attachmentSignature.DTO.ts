import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';
import { SignatureStatusType } from './signatureStatusType.ENUM';
import { SignatureType } from './signatureType.ENUM';
import { UserBasicDTO } from './userBasic.DTO';


export class AttachmentSignatureDTO implements IEntityDTO {

   ownerUser: UserBasicDTO;
   requesterUser: UserBasicDTO;
   status: SignatureStatusType;
   type: SignatureType;
   isCreator: boolean;
   requestDate: Date;
   signDate: Date;
   asBussiness: boolean;
   notify: boolean;
   id = 0;
   cacheStamp = 0;

   constructor() {
      this.ownerUser = new UserBasicDTO();
      this.requesterUser = new UserBasicDTO();
   }

   public PrepareDTO(jsonObj): void {
      if (jsonObj === null) { return; }
      if (jsonObj.ownerUser != null) { this.ownerUser.PrepareDTO(jsonObj.ownerUser); }
      if (jsonObj.requesterUser != null) { this.requesterUser.PrepareDTO(jsonObj.requesterUser); }
      if (jsonObj.status != null) { this.status = jsonObj.status as SignatureStatusType; }
      if (jsonObj.type != null) { this.type = jsonObj.type as SignatureType; }
      if (jsonObj.isCreator != null) { this.isCreator = jsonObj.isCreator; }
      if (jsonObj.requestDate != null) { this.requestDate = new Date(jsonObj.requestDate); }
      if (jsonObj.signDate != null) { this.signDate = new Date(jsonObj.signDate); }
      if (jsonObj.asBussiness != null) { this.asBussiness = jsonObj.asBussiness; }
      if (jsonObj.notify != null) { this.notify = jsonObj.notify; }
      if (jsonObj.id != null) { this.id = jsonObj.id; }
      if (jsonObj.cacheStamp != null) { this.cacheStamp = jsonObj.cacheStamp; }
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
