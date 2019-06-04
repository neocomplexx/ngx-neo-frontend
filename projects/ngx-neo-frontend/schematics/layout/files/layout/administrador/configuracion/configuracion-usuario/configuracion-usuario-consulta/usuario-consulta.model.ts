import { UserModelDTO, UserDTO } from '@neocomplexx/ngx-neo-frontend';

export class UsuarioConsultaModel extends UserModelDTO {

    /** @author bdilschneider */

    public repetirContrasenia: string;

    constructor(entityDTO: UserDTO) {
        super(entityDTO);
    }
}
