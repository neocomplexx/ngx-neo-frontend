import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { MessageDTO } from './DTO/message.DTO';
import { UserDTO } from './DTO/user.DTO';
import { UserModelDTO } from './user.ModelDTO';
import { MessageAttachmentDTO } from './DTO/messageAttachment.DTO';
import { MessageAttachmentModelDTO } from './messageAttachment.ModelDTO';


export class MessageModelDTO extends EntityModelDTO<MessageDTO> {

   private senderModel: UserModelDTO;
   private senderSubscribe: Subscription;

   public constructor(protected entityDTO: MessageDTO) {
      super(entityDTO);
   }

   public setEntityDTO(entityDTO: MessageDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO === null) { return; }
      this.senderModel = new UserModelDTO(this.entityDTO.sender);
      this.senderSubscribe = this.senderModel.changed.subscribe((changed) => this.changed.next(changed));
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }

   public dispose(): void {
      this.senderModel.dispose();
      this.senderSubscribe.unsubscribe();
   }

   get CreationDate(): Date { return this.entityDTO.creationDate; }
   set CreationDate(value: Date) { this.notifyChangeDTO('creationDate', value); }

   get ReceptionDate(): Date { return this.entityDTO.receptionDate; }
   set ReceptionDate(value: Date) { this.notifyChangeDTO('receptionDate', value); }

   get ReadDate(): Date { return this.entityDTO.readDate; }
   set ReadDate(value: Date) { this.notifyChangeDTO('readDate', value); }

   get Read(): boolean { return this.entityDTO.read; }
   set Read(value: boolean) { this.notifyChangeDTO('read', value); }

   get Archived(): boolean { return this.entityDTO.archived; }
   set Archived(value: boolean) { this.notifyChangeDTO('archived', value); }

   get SenderModel(): UserModelDTO { return this.senderModel; }
   get Sender(): UserDTO { return this.senderModel.getEntityDTO(); }
   set Sender(value: UserDTO) { this.notifyChange(() => { this.entityDTO.sender = value; this.senderModel.setEntityDTO(value); }); }

   get Receivers(): Array<UserDTO> { return this.entityDTO.receivers; }
   set Receivers(value: Array<UserDTO>) { this.notifyChangeDTO('receivers', value); }

   get Subject(): string { return this.entityDTO.subject; }
   set Subject(value: string) { this.notifyChangeDTO('subject', value); }

   get Body(): string { return this.entityDTO.body; }
   set Body(value: string) { this.notifyChangeDTO('body', value); }

   get Attachments(): Array<MessageAttachmentDTO> { return this.entityDTO.attachments; }
   set Attachments(value: Array<MessageAttachmentDTO>) { this.notifyChangeDTO('attachments', value); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }
}
