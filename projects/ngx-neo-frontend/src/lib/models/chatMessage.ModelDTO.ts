import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { ChatMessageDTO } from './DTO/chatMessage.DTO';


export class ChatMessageModelDTO extends EntityModelDTO<ChatMessageDTO> {


   public constructor(protected entityDTO: ChatMessageDTO) {
      super(entityDTO);
   }
   public setEntityDTO(entityDTO: ChatMessageDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO == null) return;
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }
   public dispose(): void {
   }

   get From(): string { return this.entityDTO.from; }
   set From(value: string) { this.notifyChangeDTO('from', value); }

   get To(): string { return this.entityDTO.to; }
   set To(value: string) { this.notifyChangeDTO('to', value); }

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

   get Message(): string { return this.entityDTO.message; }
   set Message(value: string) { this.notifyChangeDTO('message', value); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }
}
