import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { UserPasswordInseguroDTO } from './DTO/userPasswordInseguro.DTO';


export class UserPasswordInseguroModelDTO extends EntityModelDTO<UserPasswordInseguroDTO> {


   public constructor(protected entityDTO: UserPasswordInseguroDTO) {
      super(entityDTO);
   }

   public setEntityDTO(entityDTO: UserPasswordInseguroDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO === null) { return; }
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }

   public dispose(): void {
   }

   get UserName(): string { return this.entityDTO.userName; }
   set UserName(value: string) { this.notifyChangeDTO('userName', value); }

   get FullName(): string { return this.entityDTO.fullName; }
   set FullName(value: string) { this.notifyChangeDTO('fullName', value); }

   get PasswordInseguro(): boolean { return this.entityDTO.passwordInseguro; }
   set PasswordInseguro(value: boolean) { this.notifyChangeDTO('passwordInseguro', value); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }
}
