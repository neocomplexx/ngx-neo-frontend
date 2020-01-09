import { UserBasicModelDTO, UserBasicDTO } from '@neocomplexx/ngx-neo-frontend-mat';
import { Labeled } from '@neocomplexx/ngx-neo-components-mat';

export class UsuarioBasicConsultaModel extends UserBasicModelDTO implements Labeled/*  */{

    /** @author gherrou */

    public repetirContrasenia: string;

    constructor(entityDTO: UserBasicDTO) {
        super(entityDTO);
    }

    public getLabel() {
        return `${this.FullName}`;
    }
}
