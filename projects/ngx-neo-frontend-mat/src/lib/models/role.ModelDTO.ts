import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { RoleDTO } from './DTO/role.DTO';
import { RolePermissionDTO } from './DTO/rolePermission.DTO';
import { RolePermissionModelDTO } from './rolePermission.ModelDTO';
import { RoleState } from './DTO/roleState.ENUM';


export class RoleModelDTO extends EntityModelDTO<RoleDTO> {


   public constructor(protected entityDTO: RoleDTO) {
      super(entityDTO);
   }

   public static getRoleState(): string[] {
      return EntityModelDTO.getEnumArray(RoleState);
   }

   public setEntityDTO(entityDTO: RoleDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO === null) return;
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }

   public dispose(): void {
   }

   get Permissions(): Array<RolePermissionDTO> { return this.entityDTO.permissions; }
   set Permissions(value: Array<RolePermissionDTO>) { this.notifyChangeDTO('permissions', value); }

   get Name(): string { return this.entityDTO.name; }
   set Name(value: string) { this.notifyChangeDTO('name', value); }

   get Description(): string { return this.entityDTO.description; }
   set Description(value: string) { this.notifyChangeDTO('description', value); }

   get State(): string { return RoleState[this.entityDTO.state]; }
   set State(value: string) { this.notifyChangeDTO('state', RoleState[value]); }

   get NeedUserOwner(): boolean { return this.entityDTO.needUserOwner; }
   set NeedUserOwner(value: boolean) { this.notifyChangeDTO('needUserOwner', value); }

   get UserType(): number { return this.entityDTO.userType; }
   set UserType(value: number) { this.notifyChangeDTO('userType', value); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }
}
