import { UserModelDTO, UserDTO } from '@neocomplexx/ngx-neo-frontend-mat';
import { Labeled } from '@neocomplexx/ngx-neo-components-mat';

export class UsuarioConsultaModel extends UserModelDTO /*  */ {

    /** @author bdilschneider */

    public repetirContrasenia: string;

    constructor(entityDTO: UserDTO) {
        super(entityDTO);
    }

}
