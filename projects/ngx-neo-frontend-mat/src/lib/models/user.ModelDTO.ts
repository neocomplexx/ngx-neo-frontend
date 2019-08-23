import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { UserDTO } from './DTO/user.DTO';
import { RoleDTO } from './DTO/role.DTO';
import { RoleModelDTO } from './role.ModelDTO';
import { UserState } from './DTO/userState.ENUM';
import { UserTypes } from './DTO/userTypes.ENUM';


export class UserModelDTO extends EntityModelDTO<UserDTO> {

   private _RoleModel: RoleModelDTO;
   private roleSubscribe: Subscription;

   public constructor(protected entityDTO: UserDTO) {
      super(entityDTO);
   }
   public setEntityDTO(entityDTO: UserDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO == null) return;
      this._RoleModel = new RoleModelDTO(this.entityDTO.role);
      this.roleSubscribe = this._RoleModel.changed.subscribe((changed) => this.changed.next(changed));
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }
   public dispose(): void {
      this._RoleModel.dispose();
      this.roleSubscribe.unsubscribe();
   }

   get RoleModel(): RoleModelDTO { return this._RoleModel; }
   get Role(): RoleDTO { return this._RoleModel.getEntityDTO(); }
   set Role(value: RoleDTO) { this.notifyChange(() => { this.entityDTO.role = value; this._RoleModel.setEntityDTO(value) }); }

   get IdUserOwner(): number { return this.entityDTO.idUserOwner; }
   set IdUserOwner(value: number) { this.notifyChangeDTO('idUserOwner', value); }

   get UserName(): string { return this.entityDTO.userName; }
   set UserName(value: string) { this.notifyChangeDTO('userName', value); }

   get FirstName(): string { return this.entityDTO.firstName; }
   set FirstName(value: string) { this.notifyChangeDTO('firstName', value); }

   get LastName(): string { return this.entityDTO.lastName; }
   set LastName(value: string) { this.notifyChangeDTO('lastName', value); }

   get FullName(): string { return this.entityDTO.fullName; }
   set FullName(value: string) { this.notifyChangeDTO('fullName', value); }

   get Email(): string { return this.entityDTO.email; }
   set Email(value: string) { this.notifyChangeDTO('email', value); }

   get State(): string { return UserState[this.entityDTO.state]; }
   set State(value: string) { this.notifyChangeDTO('state', UserState[value]); }

   get RoleName(): string { return this.entityDTO.roleName; }
   set RoleName(value: string) { this.notifyChangeDTO('roleName', value); }

   get UserType(): string { return UserTypes[this.entityDTO.userType]; }
   set UserType(value: string) { this.notifyChangeDTO('userType', UserTypes[value]); }

   get Imagen(): string { return this.entityDTO.imagen; }
   set Imagen(value: string) { this.notifyChangeDTO('imagen', value); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }

   public static getUserState(): string[] {
      return EntityModelDTO.getEnumArray(UserState);
   }

   public static getUserTypes(): string[] {
      return EntityModelDTO.getEnumArray(UserTypes);
   }
}