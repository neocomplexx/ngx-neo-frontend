import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';

export class BackendConfigurationDTO implements IEntityDTO {

   logInfoBackend: boolean;
   logInfoOwnApp: boolean;
   logInfoPUSHNotification: boolean;
   logInfoRequestBody: boolean;
   cacheActivated: boolean;
   pushServerEnabled: boolean;
   apnsServerEnvironmentIsSandbox: boolean;
   originsDeniedByCORS: Array<string>;
   originsAllowByCORS: Array<string>;
   showRequestHeaders: boolean;
   id: number = 0;
   cacheStamp: number = 0;

   constructor() {
   }

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj == null) return;
      if (jsonObj['logInfoBackend'] != null) this.logInfoBackend = jsonObj['logInfoBackend'];
      if (jsonObj['logInfoOwnApp'] != null) this.logInfoOwnApp = jsonObj['logInfoOwnApp'];
      if (jsonObj['logInfoPUSHNotification'] != null) this.logInfoPUSHNotification = jsonObj['logInfoPUSHNotification'];
      if (jsonObj['logInfoRequestBody'] != null) this.logInfoRequestBody = jsonObj['logInfoRequestBody'];
      if (jsonObj['cacheActivated'] != null) this.cacheActivated = jsonObj['cacheActivated'];
      if (jsonObj['pushServerEnabled'] != null) this.pushServerEnabled = jsonObj['pushServerEnabled'];
      if (jsonObj['apnsServerEnvironmentIsSandbox'] != null) this.apnsServerEnvironmentIsSandbox = jsonObj['apnsServerEnvironmentIsSandbox'];
      if (jsonObj['originsDeniedByCORS'] != null) this.originsDeniedByCORS = jsonObj['originsDeniedByCORS'];
      if (jsonObj['originsAllowByCORS'] != null) this.originsAllowByCORS = jsonObj['originsAllowByCORS'];
      if (jsonObj['showRequestHeaders'] != null) this.showRequestHeaders = jsonObj['showRequestHeaders'];
      if (jsonObj['id'] != null) this.id = jsonObj['id'];
      if (jsonObj['cacheStamp'] != null) this.cacheStamp = jsonObj['cacheStamp'];
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
