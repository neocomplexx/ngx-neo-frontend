import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';

export class NeoCompanyWithAuthTokenDTO implements IEntityDTO {

   token: string = '';
   brand: string = '';
   companyName: string = '';
   taxID: string = '';
   subsidiary: number = 0;
   id: number = 0;
   cacheStamp: number = 0;

   constructor() {
   }

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj == null) return;
      if (jsonObj['token'] != null) this.token = jsonObj['token'];
      if (jsonObj['brand'] != null) this.brand = jsonObj['brand'];
      if (jsonObj['companyName'] != null) this.companyName = jsonObj['companyName'];
      if (jsonObj['taxID'] != null) this.taxID = jsonObj['taxID'];
      if (jsonObj['subsidiary'] != null) this.subsidiary = jsonObj['subsidiary'];
      if (jsonObj['id'] != null) this.id = jsonObj['id'];
      if (jsonObj['cacheStamp'] != null) this.cacheStamp = jsonObj['cacheStamp'];
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
