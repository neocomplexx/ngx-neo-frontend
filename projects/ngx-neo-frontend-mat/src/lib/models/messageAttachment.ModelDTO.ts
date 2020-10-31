import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { MessageAttachmentDTO } from './DTO/messageAttachment.DTO';


export class MessageAttachmentModelDTO extends EntityModelDTO<MessageAttachmentDTO> {


   public constructor(protected entityDTO: MessageAttachmentDTO) {
      super(entityDTO);
   }

   public setEntityDTO(entityDTO: MessageAttachmentDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO === null) return;
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }

   public dispose(): void {
   }

   get Name(): string { return this.entityDTO.name; }
   set Name(value: string) { this.notifyChangeDTO('name', value); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }
}
