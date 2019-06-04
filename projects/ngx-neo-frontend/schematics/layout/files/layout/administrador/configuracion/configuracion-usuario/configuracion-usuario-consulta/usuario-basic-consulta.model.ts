import { UserBasicModelDTO, UserBasicDTO } from '@neocomplexx/ngx-neo-frontend';

export class UsuarioBasicConsultaModel extends UserBasicModelDTO {

    /** @author gherrou */

    public repetirContrasenia: string;

    constructor(entityDTO: UserBasicDTO) {
        super(entityDTO);
    }
}
