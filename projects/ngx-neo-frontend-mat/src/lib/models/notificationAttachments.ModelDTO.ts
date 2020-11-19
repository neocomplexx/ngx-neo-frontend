import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { NotificationAttachmentsDTO } from './DTO/notificationAttachments.DTO';
import { AttachmentDTO } from './DTO/attachment.DTO';
import { AttachmentModelDTO } from './attachment.ModelDTO';
import { NotificationPriority } from './DTO/notificationPriority.ENUM';
import { NotificationState } from './DTO/notificationState.ENUM';


export class NotificationAttachmentsModelDTO extends EntityModelDTO<NotificationAttachmentsDTO> {


   public constructor(protected entityDTO: NotificationAttachmentsDTO) {
      super(entityDTO);
   }

   public static getNotificationPriority(): string[] {
      return EntityModelDTO.getEnumArray(NotificationPriority);
   }

   public static getNotificationState(): string[] {
      return EntityModelDTO.getEnumArray(NotificationState);
   }

   public setEntityDTO(entityDTO: NotificationAttachmentsDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO === null) { return; }
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }

   public dispose(): void {
   }

   get Attachments(): Array<AttachmentDTO> { return this.entityDTO.attachments; }
   set Attachments(value: Array<AttachmentDTO>) { this.notifyChangeDTO('attachments', value); }

   get UserName(): string { return this.entityDTO.userName; }
   set UserName(value: string) { this.notifyChangeDTO('userName', value); }

   get Priority(): string { return NotificationPriority[this.entityDTO.priority]; }
   set Priority(value: string) { this.notifyChangeDTO('priority', NotificationPriority[value]); }

   get NotificationType(): number { return this.entityDTO.notificationType; }
   set NotificationType(value: number) { this.notifyChangeDTO('notificationType', value); }

   get State(): string { return NotificationState[this.entityDTO.state]; }
   set State(value: string) { this.notifyChangeDTO('state', NotificationState[value]); }

   get CreationDateTime(): Date { return this.entityDTO.creationDateTime; }
   set CreationDateTime(value: Date) { this.notifyChangeDTO('creationDateTime', value); }

   get OpenDateTime(): Date { return this.entityDTO.openDateTime; }
   set OpenDateTime(value: Date) { this.notifyChangeDTO('openDateTime', value); }

   get ReadDateTime(): Date { return this.entityDTO.readDateTime; }
   set ReadDateTime(value: Date) { this.notifyChangeDTO('readDateTime', value); }

   get DisableUnderstanding(): boolean { return this.entityDTO.disableUnderstanding; }
   set DisableUnderstanding(value: boolean) { this.notifyChangeDTO('disableUnderstanding', value); }

   get UnderstoodDateTime(): Date { return this.entityDTO.understoodDateTime; }
   set UnderstoodDateTime(value: Date) { this.notifyChangeDTO('understoodDateTime', value); }

   get NotUnderstood(): boolean { return this.entityDTO.notUnderstood; }
   set NotUnderstood(value: boolean) { this.notifyChangeDTO('notUnderstood', value); }

   get Title(): string { return this.entityDTO.title; }
   set Title(value: string) { this.notifyChangeDTO('title', value); }

   get NotShowInMenu(): boolean { return this.entityDTO.notShowInMenu; }
   set NotShowInMenu(value: boolean) { this.notifyChangeDTO('notShowInMenu', value); }

   get Details(): string { return this.entityDTO.details; }
   set Details(value: string) { this.notifyChangeDTO('details', value); }

   get ServiceNotify(): string { return this.entityDTO.serviceNotify; }
   set ServiceNotify(value: string) { this.notifyChangeDTO('serviceNotify', value); }

   get Service(): string { return this.entityDTO.service; }
   set Service(value: string) { this.notifyChangeDTO('service', value); }

   get ServiceId(): number { return this.entityDTO.serviceId; }
   set ServiceId(value: number) { this.notifyChangeDTO('serviceId', value); }

   get ServiceId2(): number { return this.entityDTO.serviceId2; }
   set ServiceId2(value: number) { this.notifyChangeDTO('serviceId2', value); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }
}
