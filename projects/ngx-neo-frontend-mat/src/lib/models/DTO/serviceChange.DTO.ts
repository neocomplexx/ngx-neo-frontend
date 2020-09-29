import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';
import { ActionType } from './actionType.ENUM';


export class ServiceChangeDTO implements IEntityDTO {

   id: number = 0;
   userName: string = '';
   action: ActionType;
   serviceNotify: string = '';
   service: string = '';
   id1: number = 0;
   id2: number = 0;
   cacheStamp: number = 0;

   constructor() {
   }

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj == null) return;
      if (jsonObj['id'] != null) this.id = jsonObj['id'];
      if (jsonObj['userName'] != null) this.userName = jsonObj['userName'];
      if (jsonObj['action'] != null) this.action = jsonObj['action'] as ActionType;
      if (jsonObj['serviceNotify'] != null) this.serviceNotify = jsonObj['serviceNotify'];
      if (jsonObj['service'] != null) this.service = jsonObj['service'];
      if (jsonObj['id1'] != null) this.id1 = jsonObj['id1'];
      if (jsonObj['id2'] != null) this.id2 = jsonObj['id2'];
      if (jsonObj['cacheStamp'] != null) this.cacheStamp = jsonObj['cacheStamp'];
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
