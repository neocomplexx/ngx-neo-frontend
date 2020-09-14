import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';
import { SignatureStatusType } from './signatureStatusType.ENUM';
import { UserDTO } from './user.DTO';


export class AttachmentSignatureDTO implements IEntityDTO {

   ownerUser: UserDTO;
   requesterUser: UserDTO;
   status: SignatureStatusType;
   isCreator: boolean;
   requestDate: Date;
   signDate: Date;
   id: number = 0;
   cacheStamp: number = 0;

   constructor() {
      this.ownerUser = new UserDTO();
      this.requesterUser = new UserDTO();
   }

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj == null) return;
      if (jsonObj['ownerUser'] != null) this.ownerUser.PrepareDTO(jsonObj['ownerUser']);
      if (jsonObj['requesterUser'] != null) this.requesterUser.PrepareDTO(jsonObj['requesterUser']);
      if (jsonObj['status'] != null) this.status = jsonObj['status'] as SignatureStatusType;
      if (jsonObj['isCreator'] != null) this.isCreator = jsonObj['isCreator'];
      if (jsonObj['requestDate'] != null) this.requestDate = new Date(jsonObj['requestDate']);
      if (jsonObj['signDate'] != null) this.signDate = new Date(jsonObj['signDate']);
      if (jsonObj['id'] != null) this.id = jsonObj['id'];
      if (jsonObj['cacheStamp'] != null) this.cacheStamp = jsonObj['cacheStamp'];
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
