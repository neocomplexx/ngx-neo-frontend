import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { BackendConfigurationDTO } from './DTO/backendConfiguration.DTO';


export class BackendConfigurationModelDTO extends EntityModelDTO<BackendConfigurationDTO> {


   public constructor(protected entityDTO: BackendConfigurationDTO) {
      super(entityDTO);
   }
   public setEntityDTO(entityDTO: BackendConfigurationDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO == null) return;
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }
   public dispose(): void {
   }

   get LogInfoBackend(): boolean { return this.entityDTO.logInfoBackend; }
   set LogInfoBackend(value: boolean) { this.notifyChangeDTO('logInfoBackend', value); }

   get LogInfoOwnApp(): boolean { return this.entityDTO.logInfoOwnApp; }
   set LogInfoOwnApp(value: boolean) { this.notifyChangeDTO('logInfoOwnApp', value); }

   get LogInfoPUSHNotification(): boolean { return this.entityDTO.logInfoPUSHNotification; }
   set LogInfoPUSHNotification(value: boolean) { this.notifyChangeDTO('logInfoPUSHNotification', value); }

   get PUSHServer(): boolean { return this.entityDTO.pUSHServer; }
   set PUSHServer(value: boolean) { this.notifyChangeDTO('pUSHServer', value); }

   get ApnsServerEnvironmentIsSandbox(): boolean { return this.entityDTO.apnsServerEnvironmentIsSandbox; }
   set ApnsServerEnvironmentIsSandbox(value: boolean) { this.notifyChangeDTO('apnsServerEnvironmentIsSandbox', value); }

   get OriginsDeniedByCORS(): Array<string> { return this.entityDTO.originsDeniedByCORS; }
   set OriginsDeniedByCORS(value: Array<string>) { this.notifyChangeDTO('originsDeniedByCORS', value); }

   get OriginsAllowByCORS(): Array<string> { return this.entityDTO.originsAllowByCORS; }
   set OriginsAllowByCORS(value: Array<string>) { this.notifyChangeDTO('originsAllowByCORS', value); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }
}
