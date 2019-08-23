import { MenuGroupModel } from './menu-group.model';
import { MenuOptionsModel } from './menu-options.model';

/**
 * Clase que representa al menu, el menu se compone de grupos que se componen por opciones
 */
export class MenuModel {
    id: String;
    nombre: String;
    descripcion: String;
    habilitado: boolean;
    grupos: Array<MenuGroupModel>;

    constructor(id: String) {
        this.id = id;
        this.grupos = new Array<MenuGroupModel>();
    }

    /**
     * Agrega un grupo al menu
     * @param grupo grupo que deseamos agregar al menu
     */
    public agregarGrupo(grupo: MenuGroupModel) {
        grupo.id = this.id + '-grupo' + this.grupos.length;
        this.grupos.push(grupo);
    }
    /**
     * Metodo que retorna todas las opciones que comiencen por la letra pasada por parametro
     * @param keyCode codigo de la leta que usamos para filtrar
     */
    public filtrarOpciones(keyCode: any): Array<MenuOptionsModel> {
        const opciones: Array<MenuOptionsModel> = [];

        for (const grupo of this.grupos) {
            for (const opcion of grupo.opciones) {
                if (opcion.nombre.startsWith(String.fromCharCode(keyCode)) && opcion.comando.canExecute) {
                    opciones.push(opcion);
                }
            }
        }
        return opciones;
    }

    public primeraOpcionHabilitada(): MenuOptionsModel {
        let opcion: MenuOptionsModel = null;
        let seguir = true;
        let posGrupo = 0;
        let posOpcion: number;

        while (posGrupo < this.grupos.length && seguir) {
            posOpcion = 0;
            while (posOpcion < this.grupos[posGrupo].opciones.length && seguir) {
                // Si puede ejecutar listo
                if (this.grupos[posGrupo].opciones[posOpcion].comando.canExecute) {
                    seguir = false;
                    opcion = this.grupos[posGrupo].opciones[posOpcion];
                }
                posOpcion++;
            }
            posGrupo++;
        }

        return opcion;
    }
}
