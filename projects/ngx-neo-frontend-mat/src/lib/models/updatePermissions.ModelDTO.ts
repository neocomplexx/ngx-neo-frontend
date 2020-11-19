import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { UpdatePermissionsDTO } from './DTO/updatePermissions.DTO';
import { PermissionDTO } from './DTO/permission.DTO';
import { PermissionModelDTO } from './permission.ModelDTO';


export class UpdatePermissionsModelDTO extends EntityModelDTO<UpdatePermissionsDTO> {


   public constructor(protected entityDTO: UpdatePermissionsDTO) {
      super(entityDTO);
   }

   public setEntityDTO(entityDTO: UpdatePermissionsDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO === null) { return; }
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }

   public dispose(): void {
   }

   get Permissions(): Array<PermissionDTO> { return this.entityDTO.permissions; }
   set Permissions(value: Array<PermissionDTO>) { this.notifyChangeDTO('permissions', value); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }
}
