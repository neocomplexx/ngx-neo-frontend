import { Subscription, BehaviorSubject } from 'rxjs';
import { EntityModelDTO } from './entity.ModelDTO';
import { AuditLogEntryDTO } from './DTO/auditLogEntry.DTO';


export class AuditLogEntryModelDTO extends EntityModelDTO<AuditLogEntryDTO> {


   public constructor(protected entityDTO: AuditLogEntryDTO) {
      super(entityDTO);
   }

   public setEntityDTO(entityDTO: AuditLogEntryDTO) {
      super.setEntityDTO(entityDTO);
      if (entityDTO === null) { return; }
   }

   public isNewEntity(): boolean {
      return this.entityDTO.id === 0;
   }

   public dispose(): void {
   }

   get NombreUsuario(): string { return this.entityDTO.nombreUsuario; }
   set NombreUsuario(value: string) { this.notifyChangeDTO('nombreUsuario', value); }

   get TipoAccion(): string { return this.entityDTO.tipoAccion; }
   set TipoAccion(value: string) { this.notifyChangeDTO('tipoAccion', value); }

   get EntidadPadre(): string { return this.entityDTO.entidadPadre; }
   set EntidadPadre(value: string) { this.notifyChangeDTO('entidadPadre', value); }

   get EntidadPadreID(): number { return this.entityDTO.entidadPadreID; }
   set EntidadPadreID(value: number) { this.notifyChangeDTO('entidadPadreID', value); }

   get EntidadNombreCompleto(): string { return this.entityDTO.entidadNombreCompleto; }
   set EntidadNombreCompleto(value: string) { this.notifyChangeDTO('entidadNombreCompleto', value); }

   get EntidadNombreCorto(): string { return this.entityDTO.entidadNombreCorto; }
   set EntidadNombreCorto(value: string) { this.notifyChangeDTO('entidadNombreCorto', value); }

   get EntidadId(): number { return this.entityDTO.entidadId; }
   set EntidadId(value: number) { this.notifyChangeDTO('entidadId', value); }

   get NombreCampo(): string { return this.entityDTO.nombreCampo; }
   set NombreCampo(value: string) { this.notifyChangeDTO('nombreCampo', value); }

   get ValorViejo(): string { return this.entityDTO.valorViejo; }
   set ValorViejo(value: string) { this.notifyChangeDTO('valorViejo', value); }

   get ValorNuevo(): string { return this.entityDTO.valorNuevo; }
   set ValorNuevo(value: string) { this.notifyChangeDTO('valorNuevo', value); }

   get Estampilla(): Date { return this.entityDTO.estampilla; }
   set Estampilla(value: Date) { this.notifyChangeDTO('estampilla', value); }

   get Id(): number { return this.entityDTO.id; }
   set Id(value: number) { this.notifyChangeDTO('id', value); }

   get CacheStamp(): number { return this.entityDTO.cacheStamp; }
   set CacheStamp(value: number) { this.notifyChangeDTO('cacheStamp', value); }
}
