import { MenuGrupoModel } from './menu-grupo.model';
import { MenuOpcionModel } from './menu-opcion.model';

/**
 * Clase que representa al menu, el menu se compone de grupos que se componen por opciones
 */
export class MenuModel {
    id: String;
    nombre: String;
    descripcion: String;
    habilitado: boolean;
    grupos: Array<MenuGrupoModel>;

    constructor(id: String) {
        this.id = id;
        this.grupos = new Array<MenuGrupoModel>();
    }

    /**
     * Agrega un grupo al menu
     * @param grupo grupo que deseamos agregar al menu
     */
    public agregarGrupo(grupo: MenuGrupoModel) {
        grupo.id = this.id + '-grupo' + this.grupos.length;
        this.grupos.push(grupo);
    }
    /**
     * Metodo que retorna todas las opciones que comiencen por la letra pasada por parametro
     * @param keyCode codigo de la leta que usamos para filtrar
     */
    public filtrarOpciones(keyCode: any): Array<MenuOpcionModel> {
        const opciones: Array<MenuOpcionModel> = [];

        for (const grupo of this.grupos) {
            for (const opcion of grupo.opciones) {
                if (opcion.nombre.startsWith(String.fromCharCode(keyCode)) && opcion.comando.canExecute) {
                    opciones.push(opcion);
                }
            }
        }
        return opciones;
    }

    public primeraOpcionHabilitada(): MenuOpcionModel {
        let opcion: MenuOpcionModel = null;
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
