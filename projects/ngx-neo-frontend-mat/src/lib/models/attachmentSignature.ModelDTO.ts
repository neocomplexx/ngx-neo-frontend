import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { AttachmentSignatureDTO } from './DTO/attachmentSignature.DTO';
import { UserBasicDTO } from './DTO/userBasic.DTO';
import { UserBasicModelDTO } from './userBasic.ModelDTO';
import { SignatureStatusType } from './DTO/signatureStatusType.ENUM';
import { SignatureType } from './DTO/signatureType.ENUM';


export class AttachmentSignatureModelDTO extends EntityModelDTO<AttachmentSignatureDTO> {

   private ownerUserModel: UserBasicModelDTO;
   private ownerUserSubscribe: Subscription;
   private requesterUserModel: UserBasicModelDTO;
   private requesterUserSubscribe: Subscription;

   public constructor(protected entityDTO: AttachmentSignatureDTO) {
      super(entityDTO);
   }

   public static getSignatureStatusType(): string[] {
      return EntityModelDTO.getEnumArray(SignatureStatusType);
   }

   public static getSignatureType(): string[] {
      return EntityModelDTO.getEnumArray(SignatureType);
   }

   public setEntityDTO(entityDTO: AttachmentSignatureDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO === null) { return; }
      this.ownerUserModel = new UserBasicModelDTO(this.entityDTO.ownerUser);
      this.ownerUserSubscribe = this.ownerUserModel.changed.subscribe((changed) => this.changed.next(changed));
      this.requesterUserModel = new UserBasicModelDTO(this.entityDTO.requesterUser);
      this.requesterUserSubscribe = this.requesterUserModel.changed.subscribe((changed) => this.changed.next(changed));
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }

   public dispose(): void {
      this.ownerUserModel.dispose();
      this.ownerUserSubscribe.unsubscribe();
      this.requesterUserModel.dispose();
      this.requesterUserSubscribe.unsubscribe();
   }

   get OwnerUserModel(): UserBasicModelDTO { return this.ownerUserModel; }
   get OwnerUser(): UserBasicDTO { return this.ownerUserModel.getEntityDTO(); }
   set OwnerUser(value: UserBasicDTO) { this.notifyChange(() => { this.entityDTO.ownerUser = value; this.ownerUserModel.setEntityDTO(value); }); }

   get RequesterUserModel(): UserBasicModelDTO { return this.requesterUserModel; }
   get RequesterUser(): UserBasicDTO { return this.requesterUserModel.getEntityDTO(); }
   set RequesterUser(value: UserBasicDTO) { this.notifyChange(() => { this.entityDTO.requesterUser = value; this.requesterUserModel.setEntityDTO(value); }); }

   get Status(): string { return SignatureStatusType[this.entityDTO.status]; }
   set Status(value: string) { this.notifyChangeDTO('status', SignatureStatusType[value]); }

   get Type(): string { return SignatureType[this.entityDTO.type]; }
   set Type(value: string) { this.notifyChangeDTO('type', SignatureType[value]); }

   get IsCreator(): boolean { return this.entityDTO.isCreator; }
   set IsCreator(value: boolean) { this.notifyChangeDTO('isCreator', value); }

   get RequestDate(): Date { return this.entityDTO.requestDate; }
   set RequestDate(value: Date) { this.notifyChangeDTO('requestDate', value); }

   get SignDate(): Date { return this.entityDTO.signDate; }
   set SignDate(value: Date) { this.notifyChangeDTO('signDate', value); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }
}
