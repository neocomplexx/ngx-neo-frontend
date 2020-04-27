import { IEntityDTO } from './entity.DTO';
import { NamedBlobDTO } from './namedBlob.DTO';

export class AuditLogEntryDTO implements IEntityDTO {

   nombreUsuario: string = '';
   tipoAccion: string = '';
   entidadPadre: string = '';
   entidadPadreID: number = 0;
   entidadNombreCompleto: string = '';
   entidadNombreCorto: string = '';
   entidadId: number = 0;
   nombreCampo: string = '';
   valorViejo: string = '';
   valorNuevo: string = '';
   estampilla: Date;
   id: number = 0;
   cacheStamp: number = 0;

   constructor() {
   }

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj == null) return;
      if (jsonObj['nombreUsuario'] != null) this.nombreUsuario = jsonObj['nombreUsuario'];
      if (jsonObj['tipoAccion'] != null) this.tipoAccion = jsonObj['tipoAccion'];
      if (jsonObj['entidadPadre'] != null) this.entidadPadre = jsonObj['entidadPadre'];
      if (jsonObj['entidadPadreID'] != null) this.entidadPadreID = jsonObj['entidadPadreID'];
      if (jsonObj['entidadNombreCompleto'] != null) this.entidadNombreCompleto = jsonObj['entidadNombreCompleto'];
      if (jsonObj['entidadNombreCorto'] != null) this.entidadNombreCorto = jsonObj['entidadNombreCorto'];
      if (jsonObj['entidadId'] != null) this.entidadId = jsonObj['entidadId'];
      if (jsonObj['nombreCampo'] != null) this.nombreCampo = jsonObj['nombreCampo'];
      if (jsonObj['valorViejo'] != null) this.valorViejo = jsonObj['valorViejo'];
      if (jsonObj['valorNuevo'] != null) this.valorNuevo = jsonObj['valorNuevo'];
      if (jsonObj['estampilla'] != null) this.estampilla = new Date(jsonObj['estampilla']);
      if (jsonObj['id'] != null) this.id = jsonObj['id'];
      if (jsonObj['cacheStamp'] != null) this.cacheStamp = jsonObj['cacheStamp'];
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
