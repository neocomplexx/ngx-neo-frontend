import { ICommand } from '@neocomplexx/ngx-neo-directives';

/**
 * Clase que representa una opcion individual del menu
 */
export class MenuOptionsModel {
    id: String;
    nombre: String;
    descripcion: String;
    comando: ICommand;
}
