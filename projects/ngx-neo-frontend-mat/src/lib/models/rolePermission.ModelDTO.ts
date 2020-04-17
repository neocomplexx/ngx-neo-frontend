import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { RolePermissionDTO } from './DTO/rolePermission.DTO';
import { PermissionDTO } from './DTO/permission.DTO';
import { PermissionModelDTO } from './permission.ModelDTO';
import { RolePermissionState } from './DTO/rolePermissionState.ENUM';


export class RolePermissionModelDTO extends EntityModelDTO<RolePermissionDTO> {

   private _PermissionModel: PermissionModelDTO;
   private permissionSubscribe: Subscription;

   public constructor(protected entityDTO: RolePermissionDTO) {
      super(entityDTO);
   }
   public setEntityDTO(entityDTO: RolePermissionDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO == null) return;
      this._PermissionModel = new PermissionModelDTO(this.entityDTO.permission);
      this.permissionSubscribe = this._PermissionModel.changed.subscribe((changed) => this.changed.next(changed));
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }
   public dispose(): void {
      this._PermissionModel.dispose();
      this.permissionSubscribe.unsubscribe();
   }

   get PermissionModel(): PermissionModelDTO { return this._PermissionModel; }
   get Permission(): PermissionDTO { return this._PermissionModel.getEntityDTO(); }
   set Permission(value: PermissionDTO) { this.notifyChange(() => { this.entityDTO.permission = value; this._PermissionModel.setEntityDTO(value) }); }

   get State(): string { return RolePermissionState[this.entityDTO.state]; }
   set State(value: string) { this.notifyChangeDTO('state', RolePermissionState[value]); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }

   public static getRolePermissionState(): string[] {
      return EntityModelDTO.getEnumArray(RolePermissionState);
   }
}
