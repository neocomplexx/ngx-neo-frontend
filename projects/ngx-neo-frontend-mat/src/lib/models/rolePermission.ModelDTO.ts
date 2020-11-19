import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { RolePermissionDTO } from './DTO/rolePermission.DTO';
import { PermissionDTO } from './DTO/permission.DTO';
import { PermissionModelDTO } from './permission.ModelDTO';
import { RolePermissionState } from './DTO/rolePermissionState.ENUM';


export class RolePermissionModelDTO extends EntityModelDTO<RolePermissionDTO> {

   private permissionModel: PermissionModelDTO;
   private permissionSubscribe: Subscription;

   public constructor(protected entityDTO: RolePermissionDTO) {
      super(entityDTO);
   }

   public static getRolePermissionState(): string[] {
      return EntityModelDTO.getEnumArray(RolePermissionState);
   }

   public setEntityDTO(entityDTO: RolePermissionDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO === null) { return; }
      this.permissionModel = new PermissionModelDTO(this.entityDTO.permission);
      this.permissionSubscribe = this.permissionModel.changed.subscribe((changed) => this.changed.next(changed));
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }

   public dispose(): void {
      this.permissionModel.dispose();
      this.permissionSubscribe.unsubscribe();
   }

   get PermissionModel(): PermissionModelDTO { return this.permissionModel; }
   get Permission(): PermissionDTO { return this.permissionModel.getEntityDTO(); }
   set Permission(value: PermissionDTO) { this.notifyChange(() => { this.entityDTO.permission = value; this.permissionModel.setEntityDTO(value); }); }

   get State(): string { return RolePermissionState[this.entityDTO.state]; }
   set State(value: string) { this.notifyChangeDTO('state', RolePermissionState[value]); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }
}
