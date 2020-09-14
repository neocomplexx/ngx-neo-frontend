import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { AttachmentSignatureDTO } from './DTO/attachmentSignature.DTO';
import { UserDTO } from './DTO/user.DTO';
import { UserModelDTO } from './user.ModelDTO';
import { SignatureStatusType } from './DTO/signatureStatusType.ENUM';


export class AttachmentSignatureModelDTO extends EntityModelDTO<AttachmentSignatureDTO> {

   private _OwnerUserModel: UserModelDTO;
   private ownerUserSubscribe: Subscription;
   private _RequesterUserModel: UserModelDTO;
   private requesterUserSubscribe: Subscription;

   public constructor(protected entityDTO: AttachmentSignatureDTO) {
      super(entityDTO);
   }
   public setEntityDTO(entityDTO: AttachmentSignatureDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO == null) return;
      this._OwnerUserModel = new UserModelDTO(this.entityDTO.ownerUser);
      this.ownerUserSubscribe = this._OwnerUserModel.changed.subscribe((changed) => this.changed.next(changed));
      this._RequesterUserModel = new UserModelDTO(this.entityDTO.requesterUser);
      this.requesterUserSubscribe = this._RequesterUserModel.changed.subscribe((changed) => this.changed.next(changed));
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }
   public dispose(): void {
      this._OwnerUserModel.dispose();
      this.ownerUserSubscribe.unsubscribe();
      this._RequesterUserModel.dispose();
      this.requesterUserSubscribe.unsubscribe();
   }

   get OwnerUserModel(): UserModelDTO { return this._OwnerUserModel; }
   get OwnerUser(): UserDTO { return this._OwnerUserModel.getEntityDTO(); }
   set OwnerUser(value: UserDTO) { this.notifyChange(() => { this.entityDTO.ownerUser = value; this._OwnerUserModel.setEntityDTO(value) }); }

   get RequesterUserModel(): UserModelDTO { return this._RequesterUserModel; }
   get RequesterUser(): UserDTO { return this._RequesterUserModel.getEntityDTO(); }
   set RequesterUser(value: UserDTO) { this.notifyChange(() => { this.entityDTO.requesterUser = value; this._RequesterUserModel.setEntityDTO(value) }); }

   get Status(): string { return SignatureStatusType[this.entityDTO.status]; }
   set Status(value: string) { this.notifyChangeDTO('status', SignatureStatusType[value]); }

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

   public static getSignatureStatusType(): string[] {
      return EntityModelDTO.getEnumArray(SignatureStatusType);
   }
}
