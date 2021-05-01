import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { UserDTO } from './DTO/user.DTO';
import { RoleDTO } from './DTO/role.DTO';
import { RoleModelDTO } from './role.ModelDTO';
import { UserState } from './DTO/userState.ENUM';
import { UserTypes } from './DTO/userTypes.ENUM';


export class UserModelDTO extends EntityModelDTO<UserDTO> {

   private roleModel: RoleModelDTO;
   private roleSubscribe: Subscription;

   public constructor(protected entityDTO: UserDTO) {
      super(entityDTO);
   }

   public static getUserState(): string[] {
      return EntityModelDTO.getEnumArray(UserState);
   }

   public static getUserTypes(): string[] {
      return EntityModelDTO.getEnumArray(UserTypes);
   }

    protected getStringFromUserTypes(enums: UserTypes): Array<string> {
        if (enums) {
            const arrays = new Array<string>();
            for (let i = 0; i <= 31; i = i++) {
                const pow = Math.pow(2, i);
                if ((enums & pow) !== 0) {
                    arrays.push(UserTypes[pow]);
                }
            }
            return arrays;
        } else {
            return undefined;
        }
    }

    protected getFlagFromUserTypesString(strings: Array<string>): UserTypes {
        let flags: UserTypes;
        strings.forEach(element => {
            const enumVal: UserTypes = UserTypes[element];
            flags |= enumVal;
        });
        return flags;
    }

   public setEntityDTO(entityDTO: UserDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO === null) { return; }
      this.roleModel = new RoleModelDTO(this.entityDTO.role);
      this.roleSubscribe = this.roleModel.changed.subscribe((changed) => this.changed.next(changed));
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }

   public dispose(): void {
      this.roleModel.dispose();
      this.roleSubscribe.unsubscribe();
   }

   get RoleModel(): RoleModelDTO { return this.roleModel; }
   get Role(): RoleDTO { return this.roleModel.getEntityDTO(); }
   set Role(value: RoleDTO) { this.notifyChange(() => { this.entityDTO.role = value; this.roleModel.setEntityDTO(value); }); }

   get IdUserOwner(): number { return this.entityDTO.idUserOwner; }
   set IdUserOwner(value: number) { this.notifyChangeDTO('idUserOwner', value); }

   get UserTypeId(): number { return this.entityDTO.userTypeId; }
   set UserTypeId(value: number) { this.notifyChangeDTO('userTypeId', value); }

   get OwnCode(): string { return this.entityDTO.ownCode; }
   set OwnCode(value: string) { this.notifyChangeDTO('ownCode', value); }

   get HasMoreAccounts(): boolean { return this.entityDTO.hasMoreAccounts; }
   set HasMoreAccounts(value: boolean) { this.notifyChangeDTO('hasMoreAccounts', value); }

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

   get UserTypeArray(): Array<string> { return this.getStringFromUserTypes(this.entityDTO.userType); }
   set UserTypeArray(value: Array<string>) { this.notifyChangeDTO('userType', this.getFlagFromUserTypesString(value)); }

   get Image(): string { return this.entityDTO.image; }
   set Image(value: string) { this.notifyChangeDTO('image', value); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }
}
