import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';
import { ActionType } from './actionType.ENUM';


export class ServiceChangeDTO implements IEntityDTO {

   userName = '';
   action: ActionType;
   serviceNotify = '';
   service = '';
   id1 = 0;
   id2 = 0;
   id = 0;
   cacheStamp = 0;

   constructor() {
   }

   public PrepareDTO(jsonObj): void {
      if (jsonObj === null) { return; }
      if (jsonObj.userName != null) { this.userName = jsonObj.userName; }
      if (jsonObj.action != null) { this.action = jsonObj.action as ActionType; }
      if (jsonObj.serviceNotify != null) { this.serviceNotify = jsonObj.serviceNotify; }
      if (jsonObj.service != null) { this.service = jsonObj.service; }
      if (jsonObj.id1 != null) { this.id1 = jsonObj.id1; }
      if (jsonObj.id2 != null) { this.id2 = jsonObj.id2; }
      if (jsonObj.id != null) { this.id = jsonObj.id; }
      if (jsonObj.cacheStamp != null) { this.cacheStamp = jsonObj.cacheStamp; }
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
