import { MenuOptionsModel } from './menu-options.model';


/**
 * Clase que representa a un grupo del menu
 */

export class MenuGroupModel {
    id: String;
    nombre: String;
    descripcion: String;
    habilitado: boolean;
    opciones: Array<MenuOptionsModel>;

    constructor(id: string) {
        this.opciones = new Array<MenuOptionsModel>();
        this.id = id;
    }

    public agregarOpcion(nuevaOpcion: MenuOptionsModel) {
        this.opciones.push(nuevaOpcion);
        nuevaOpcion.id = 'i' + this.id + '-opcion' + this.opciones.length;
    }
}
