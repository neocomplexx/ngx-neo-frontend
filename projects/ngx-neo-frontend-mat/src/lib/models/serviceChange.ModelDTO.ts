import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { ServiceChangeDTO } from './DTO/serviceChange.DTO';
import { ActionType } from './DTO/actionType.ENUM';


export class ServiceChangeModelDTO extends EntityModelDTO<ServiceChangeDTO> {


   public constructor(protected entityDTO: ServiceChangeDTO) {
      super(entityDTO);
   }
   public setEntityDTO(entityDTO: ServiceChangeDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO == null) return;
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }
   public dispose(): void {
   }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get UserName(): string { return this.entityDTO.userName; }
   set UserName(value: string) { this.notifyChangeDTO('userName', value); }

   get Action(): string { return ActionType[this.entityDTO.action]; }
   set Action(value: string) { this.notifyChangeDTO('action', ActionType[value]); }

   get ServiceNotify(): string { return this.entityDTO.serviceNotify; }
   set ServiceNotify(value: string) { this.notifyChangeDTO('serviceNotify', value); }

   get Service(): string { return this.entityDTO.service; }
   set Service(value: string) { this.notifyChangeDTO('service', value); }

   get Id1(): number { return this.entityDTO.id1; }
   set Id1(value: number) { this.notifyChangeDTO('id1', value); }

   get Id2(): number { return this.entityDTO.id2; }
   set Id2(value: number) { this.notifyChangeDTO('id2', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }

   public static getActionType(): string[] {
      return EntityModelDTO.getEnumArray(ActionType);
   }
}
