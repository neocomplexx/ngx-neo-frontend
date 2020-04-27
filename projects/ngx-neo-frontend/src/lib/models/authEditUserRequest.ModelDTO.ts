import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { AuthEditUserRequestDTO } from './DTO/authEditUserRequest.DTO';
import { UserState } from './DTO/userState.ENUM';


export class AuthEditUserRequestModelDTO extends EntityModelDTO<AuthEditUserRequestDTO> {


   public constructor(protected entityDTO: AuthEditUserRequestDTO) {
      super(entityDTO);
   }
   public setEntityDTO(entityDTO: AuthEditUserRequestDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO == null) return;
   }
   public dispose(): void {
   }

   get FirstName(): string { return this.entityDTO.firstName; }
   set FirstName(value: string) { this.notifyChangeDTO('firstName', value); }

   get LastName(): string { return this.entityDTO.lastName; }
   set LastName(value: string) { this.notifyChangeDTO('lastName', value); }

   get UserName(): string { return this.entityDTO.userName; }
   set UserName(value: string) { this.notifyChangeDTO('userName', value); }

   get IdRole(): number { return this.entityDTO.idRole; }
   set IdRole(value: number) { this.notifyChangeDTO('idRole', value); }

   get IdUserOwner(): number { return this.entityDTO.idUserOwner; }
   set IdUserOwner(value: number) { this.notifyChangeDTO('idUserOwner', value); }

   get State(): string { return UserState[this.entityDTO.state]; }
   set State(value: string) { this.notifyChangeDTO('state', UserState[value]); }

   public static getUserState(): string[] {
      return EntityModelDTO.getEnumArray(UserState);
   }
}
