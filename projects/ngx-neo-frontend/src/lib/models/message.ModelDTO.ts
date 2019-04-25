import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { MessageDTO } from './DTO/message.DTO';
import { UserDTO } from './DTO/user.DTO';
import { UserModelDTO } from './user.ModelDTO';
import { AttachmentDTO } from './DTO/attachment.DTO';
import { AttachmentModelDTO } from './attachment.ModelDTO';


export class MessageModelDTO extends EntityModelDTO<MessageDTO> {

   private _SenderModel: UserModelDTO;
   private senderSubscribe: Subscription;

   public constructor(protected entityDTO: MessageDTO) {
      super(entityDTO);
   }
   public setEntityDTO(entityDTO: MessageDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO == null) return;
      this._SenderModel = new UserModelDTO(this.entityDTO.sender);
      this.senderSubscribe = this._SenderModel.changed.subscribe((changed) => this.changed.next(changed));
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }
   public dispose(): void {
      this._SenderModel.dispose();
      this.senderSubscribe.unsubscribe();
   }

   get CreationDate(): string { return this.dateToString(this.entityDTO.creationDate); }
   set CreationDate(value: string) {
      const date = this.stringToDate(value);
      if (date) { this.notifyChangeDTO('creationDate', date); }
   }

   get ReceptionDate(): string { return this.dateToString(this.entityDTO.receptionDate); }
   set ReceptionDate(value: string) {
      const date = this.stringToDate(value);
      if (date) { this.notifyChangeDTO('receptionDate', date); }
   }

   get ReadDate(): string { return this.dateToString(this.entityDTO.readDate); }
   set ReadDate(value: string) {
      const date = this.stringToDate(value);
      if (date) { this.notifyChangeDTO('readDate', date); }
   }

   get Read(): boolean { return this.entityDTO.read; }
   set Read(value: boolean) { this.notifyChangeDTO('read', value); }

   get Archived(): boolean { return this.entityDTO.archived; }
   set Archived(value: boolean) { this.notifyChangeDTO('archived', value); }

   get SenderModel(): UserModelDTO { return this._SenderModel; }
   get Sender(): UserDTO { return this._SenderModel.getEntityDTO(); }
   set Sender(value: UserDTO) { this.notifyChange(() => { this.entityDTO.sender = value; this._SenderModel.setEntityDTO(value) }); }

   get Receivers(): Array<UserDTO> { return this.entityDTO.receivers; }
   set Receivers(value: Array<UserDTO>) { this.notifyChangeDTO('receivers', value); }

   get Subject(): string { return this.entityDTO.subject; }
   set Subject(value: string) { this.notifyChangeDTO('subject', value); }

   get Body(): string { return this.entityDTO.body; }
   set Body(value: string) { this.notifyChangeDTO('body', value); }

   get Attachments(): Array<AttachmentDTO> { return this.entityDTO.attachments; }
   set Attachments(value: Array<AttachmentDTO>) { this.notifyChangeDTO('attachments', value); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }
}
