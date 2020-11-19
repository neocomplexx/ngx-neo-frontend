import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { PermissionDTO } from './DTO/permission.DTO';


export class PermissionModelDTO extends EntityModelDTO<PermissionDTO> {


   public constructor(protected entityDTO: PermissionDTO) {
      super(entityDTO);
   }

   public setEntityDTO(entityDTO: PermissionDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO === null) { return; }
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }

   public dispose(): void {
   }

   get Method(): string { return this.entityDTO.method; }
   set Method(value: string) { this.notifyChangeDTO('method', value); }

   get Path(): string { return this.entityDTO.path; }
   set Path(value: string) { this.notifyChangeDTO('path', value); }

   get Module(): string { return this.entityDTO.module; }
   set Module(value: string) { this.notifyChangeDTO('module', value); }

   get Description(): string { return this.entityDTO.description; }
   set Description(value: string) { this.notifyChangeDTO('description', value); }

   get Ignore(): boolean { return this.entityDTO.ignore; }
   set Ignore(value: boolean) { this.notifyChangeDTO('ignore', value); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }
}
