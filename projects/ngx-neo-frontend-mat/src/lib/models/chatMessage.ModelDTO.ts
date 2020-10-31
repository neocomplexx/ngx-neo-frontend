import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { ChatMessageDTO } from './DTO/chatMessage.DTO';


export class ChatMessageModelDTO extends EntityModelDTO<ChatMessageDTO> {


   public constructor(protected entityDTO: ChatMessageDTO) {
      super(entityDTO);
   }

   public setEntityDTO(entityDTO: ChatMessageDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO === null) return;
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

   get CreationDate(): Date { return this.entityDTO.creationDate; }
   set CreationDate(value: Date) { this.notifyChangeDTO('creationDate', value); }

   get ReceptionDate(): Date { return this.entityDTO.receptionDate; }
   set ReceptionDate(value: Date) { this.notifyChangeDTO('receptionDate', value); }

   get ReadDate(): Date { return this.entityDTO.readDate; }
   set ReadDate(value: Date) { this.notifyChangeDTO('readDate', value); }

   get Message(): string { return this.entityDTO.message; }
   set Message(value: string) { this.notifyChangeDTO('message', value); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }
}
