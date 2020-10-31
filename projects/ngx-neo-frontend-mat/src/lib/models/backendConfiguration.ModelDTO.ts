import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { BackendConfigurationDTO } from './DTO/backendConfiguration.DTO';


export class BackendConfigurationModelDTO extends EntityModelDTO<BackendConfigurationDTO> {


   public constructor(protected entityDTO: BackendConfigurationDTO) {
      super(entityDTO);
   }

   public setEntityDTO(entityDTO: BackendConfigurationDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO === null) return;
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }

   public dispose(): void {
   }

   get MainDomain(): string { return this.entityDTO.mainDomain; }
   set MainDomain(value: string) { this.notifyChangeDTO('mainDomain', value); }

   get SiteName(): string { return this.entityDTO.siteName; }
   set SiteName(value: string) { this.notifyChangeDTO('siteName', value); }

   get LogInfoBackend(): boolean { return this.entityDTO.logInfoBackend; }
   set LogInfoBackend(value: boolean) { this.notifyChangeDTO('logInfoBackend', value); }

   get LogInfoOwnApp(): boolean { return this.entityDTO.logInfoOwnApp; }
   set LogInfoOwnApp(value: boolean) { this.notifyChangeDTO('logInfoOwnApp', value); }

   get LogInfoPUSHNotification(): boolean { return this.entityDTO.logInfoPUSHNotification; }
   set LogInfoPUSHNotification(value: boolean) { this.notifyChangeDTO('logInfoPUSHNotification', value); }

   get LogInfoRequestBody(): boolean { return this.entityDTO.logInfoRequestBody; }
   set LogInfoRequestBody(value: boolean) { this.notifyChangeDTO('logInfoRequestBody', value); }

   get CacheActivated(): boolean { return this.entityDTO.cacheActivated; }
   set CacheActivated(value: boolean) { this.notifyChangeDTO('cacheActivated', value); }

   get PushServerEnabled(): boolean { return this.entityDTO.pushServerEnabled; }
   set PushServerEnabled(value: boolean) { this.notifyChangeDTO('pushServerEnabled', value); }

   get ApnsServerEnvironmentIsSandbox(): boolean { return this.entityDTO.apnsServerEnvironmentIsSandbox; }
   set ApnsServerEnvironmentIsSandbox(value: boolean) { this.notifyChangeDTO('apnsServerEnvironmentIsSandbox', value); }

   get OriginsDeniedByCORS(): Array<string> { return this.entityDTO.originsDeniedByCORS; }
   set OriginsDeniedByCORS(value: Array<string>) { this.notifyChangeDTO('originsDeniedByCORS', value); }

   get OriginsAllowByCORS(): Array<string> { return this.entityDTO.originsAllowByCORS; }
   set OriginsAllowByCORS(value: Array<string>) { this.notifyChangeDTO('originsAllowByCORS', value); }

   get ShowRequestHeaders(): boolean { return this.entityDTO.showRequestHeaders; }
   set ShowRequestHeaders(value: boolean) { this.notifyChangeDTO('showRequestHeaders', value); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }
}
