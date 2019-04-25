import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';
import { UserState } from './userState.ENUM';


export class UserBasicDTO implements IEntityDTO {

   userName: string = '';
   firstName: string = '';
   lastName: string = '';
   fullName: string = '';
   email: string = '';
   state: UserState;
   imagen: string = '';
   id: number = 0;
   cacheStamp: number = 0;

   constructor() {
   }

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj == null) return;
      if (jsonObj['userName'] != null) this.userName = jsonObj['userName'];
      if (jsonObj['firstName'] != null) this.firstName = jsonObj['firstName'];
      if (jsonObj['lastName'] != null) this.lastName = jsonObj['lastName'];
      if (jsonObj['fullName'] != null) this.fullName = jsonObj['fullName'];
      if (jsonObj['email'] != null) this.email = jsonObj['email'];
      if (jsonObj['state'] != null) this.state = jsonObj['state'] as UserState;
      if (jsonObj['imagen'] != null) this.imagen = jsonObj['imagen'];
      if (jsonObj['id'] != null) this.id = jsonObj['id'];
      if (jsonObj['cacheStamp'] != null) this.cacheStamp = jsonObj['cacheStamp'];
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
