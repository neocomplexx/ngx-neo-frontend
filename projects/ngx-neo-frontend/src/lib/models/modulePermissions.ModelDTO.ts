import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { ModulePermissionsDTO } from './DTO/modulePermissions.DTO';
import { PermissionDTO } from './DTO/permission.DTO';
import { PermissionModelDTO } from './permission.ModelDTO';


export class ModulePermissionsModelDTO extends EntityModelDTO<ModulePermissionsDTO> {


   public constructor(protected entityDTO: ModulePermissionsDTO) {
      super(entityDTO);
   }
   public setEntityDTO(entityDTO: ModulePermissionsDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO == null) return;
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }
   public dispose(): void {
   }

   get Name(): string { return this.entityDTO.name; }
   set Name(value: string) { this.notifyChangeDTO('name', value); }

   get Permissions(): Array<PermissionDTO> { return this.entityDTO.permissions; }
   set Permissions(value: Array<PermissionDTO>) { this.notifyChangeDTO('permissions', value); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }
}
