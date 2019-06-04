import { MenuOpcionModel } from './menu-opcion.model';


/**
 * Clase que representa a un grupo del menu
 */

export class MenuGrupoModel {
    id: String;
    nombre: String;
    descripcion: String;
    habilitado: boolean;
    opciones: Array<MenuOpcionModel>;

    constructor(id: string) {
        this.opciones = new Array<MenuOpcionModel>();
        this.id = id;
    }

    public agregarOpcion(nuevaOpcion: MenuOpcionModel) {
        this.opciones.push(nuevaOpcion);
        nuevaOpcion.id = 'i' + this.id + '-opcion' + this.opciones.length;
    }
}
