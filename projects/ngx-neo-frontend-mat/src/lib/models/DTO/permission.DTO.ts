import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';

export class PermissionDTO implements IEntityDTO {

   method: string = '';
   path: string = '';
   module: string = '';
   description: string = '';
   ignore: boolean;
   id: number = 0;
   cacheStamp: number = 0;

   constructor() {
   }

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj == null) return;
      if (jsonObj['method'] != null) this.method = jsonObj['method'];
      if (jsonObj['path'] != null) this.path = jsonObj['path'];
      if (jsonObj['module'] != null) this.module = jsonObj['module'];
      if (jsonObj['description'] != null) this.description = jsonObj['description'];
      if (jsonObj['ignore'] != null) this.ignore = jsonObj['ignore'];
      if (jsonObj['id'] != null) this.id = jsonObj['id'];
      if (jsonObj['cacheStamp'] != null) this.cacheStamp = jsonObj['cacheStamp'];
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
