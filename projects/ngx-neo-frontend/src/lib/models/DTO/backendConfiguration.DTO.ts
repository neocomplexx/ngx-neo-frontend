import { IEntityDTO } from './entity.DTO';
 
export class BackendConfigurationDTO implements IEntityDTO {

   logInfoBackend: boolean;
   logInfoOwnApp: boolean;
   logInfoPUSHNotification: boolean;
   pUSHServer: boolean;
   apnsServerEnvironmentIsSandbox: boolean;
   originsDeniedByCORS: Array<string>;
   originsAllowByCORS: Array<string>;
   id: number = 0;
   cacheStamp: number = 0;

   constructor() {
   }

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj == null) return;
      if (jsonObj['logInfoBackend'] != null) this.logInfoBackend = jsonObj['logInfoBackend'];
      if (jsonObj['logInfoOwnApp'] != null) this.logInfoOwnApp = jsonObj['logInfoOwnApp'];
      if (jsonObj['logInfoPUSHNotification'] != null) this.logInfoPUSHNotification = jsonObj['logInfoPUSHNotification'];
      if (jsonObj['pUSHServer'] != null) this.pUSHServer = jsonObj['pUSHServer'];
      if (jsonObj['apnsServerEnvironmentIsSandbox'] != null) this.apnsServerEnvironmentIsSandbox = jsonObj['apnsServerEnvironmentIsSandbox'];
      if (jsonObj['originsDeniedByCORS'] != null) this.originsDeniedByCORS = jsonObj['originsDeniedByCORS'];
      if (jsonObj['originsAllowByCORS'] != null) this.originsAllowByCORS = jsonObj['originsAllowByCORS'];
      if (jsonObj['id'] != null) this.id = jsonObj['id'];
      if (jsonObj['cacheStamp'] != null) this.cacheStamp = jsonObj['cacheStamp'];
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
