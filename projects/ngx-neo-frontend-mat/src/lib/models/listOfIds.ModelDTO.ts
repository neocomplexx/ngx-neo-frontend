import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { ListOfIdsDTO } from './DTO/listOfIds.DTO';


export class ListOfIdsModelDTO extends EntityModelDTO<ListOfIdsDTO> {


   public constructor(protected entityDTO: ListOfIdsDTO) {
      super(entityDTO);
   }

   public setEntityDTO(entityDTO: ListOfIdsDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO === null) { return; }
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }

   public dispose(): void {
   }

   get Ids(): Array<number> { return this.entityDTO.ids; }
   set Ids(value: Array<number>) { this.notifyChangeDTO('ids', value); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }
}
