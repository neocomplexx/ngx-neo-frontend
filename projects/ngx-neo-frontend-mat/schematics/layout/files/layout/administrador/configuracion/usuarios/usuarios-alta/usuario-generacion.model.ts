import { AuthNewUserRequestModelDTO, AuthNewUserRequestDTO } from '@neocomplexx/ngx-neo-frontend-mat';

export class UsuarioGeneracionModel extends AuthNewUserRequestModelDTO {

    public repetirContrasenia: string;

    constructor(entityDTO: AuthNewUserRequestDTO) {
        super(entityDTO);
        this.repetirContrasenia = '';
    }

    /**
     * Controla que las contraseñas sean correctas para luego colocar el tilde e informar al usuario
     * Si la contraseña es indefinida, es decir no se ha colocado, no lo muestra
     * @author bdilschneider
     */
    get validacionContraseniaCorrecta() {
        return (this.Password !== undefined || this.repetirContrasenia !== undefined) &&
                (this.Password !== '' || this.repetirContrasenia !== '') &&
                (this.Password === this.repetirContrasenia);
    }

    /**
     * Controla que las contraseñas sean incorrectas para luego colocar la cruz e informar al usuario
     * Si la contraseña es indefinida, es decir  o no se ha colocado, no lo muestra
     * @author bdilschneider
     */
    get validacionContraseniaIncorrecta() {
        return (this.Password !== undefined || this.repetirContrasenia !== undefined) &&
                (this.Password !== '' || this.repetirContrasenia !== '') &&
                (this.Password !== this.repetirContrasenia);
    }
}
