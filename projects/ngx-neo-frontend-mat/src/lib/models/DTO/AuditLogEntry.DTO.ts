import { IEntityDTO } from './entity.DTO';

export class AuditLogEntryDTO implements IEntityDTO {

   nombreUsuario: string = '';
   tipoAccion: string = '';
   entidadPadre: string = '';
   entidadNombreCompleto: string = '';
   entidadNombreCorto: string = '';
   nombreCampo: string = '';
   id: number = 0;
   estampilla: number = 0;

   constructor() {
   }

   public PrepareDTO(jsonObj: any): void {
      if (jsonObj == null) return;
      if (jsonObj['nombreUsuario'] != null) this.nombreUsuario = jsonObj['nombreUsuario'];
      if (jsonObj['tipoAccion'] != null) this.tipoAccion = jsonObj['tipoAccion'];
      if (jsonObj['entidadPadre'] != null) this.entidadPadre = jsonObj['entidadPadre'];
      if (jsonObj['entidadNombreCompleto'] != null) this.entidadNombreCompleto = jsonObj['entidadNombreCompleto'];
      if (jsonObj['entidadNombreCorto'] != null) this.entidadNombreCorto = jsonObj['entidadNombreCorto'];
      if (jsonObj['nombreCampo'] != null) this.nombreCampo = jsonObj['nombreCampo'];
      if (jsonObj['id'] != null) this.id = jsonObj['id'];
      if (jsonObj['estampilla'] != null) this.estampilla = jsonObj['estampilla'];
   }

   public isNewEntity(): boolean {
      return this.id === 0;
   }
}
