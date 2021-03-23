import { ICommand } from '@neocomplexx/ngx-neo-directives-mat';

/**
 * Clase que representa una opcion individual del menu
 */
export class MenuOptionsModel {
    id: string;
    nombre: string;
    descripcion: string;
    comando: ICommand;
    featureName: string;
}
