import { AuthChangePasswordRequestDTO } from '@neocomplexx/ngx-neo-frontend';
import { AuthChangePasswordRequestModelDTO  } from '@neocomplexx/ngx-neo-frontend';

export class PerfilNewPasswordModel extends AuthChangePasswordRequestModelDTO {

        public repeatPassword: string;

        constructor(entityDTO: AuthChangePasswordRequestDTO) {
            super(entityDTO);
            this.repeatPassword = '';
        }

        /**
         * Controla que las contraseñas sean correctas para luego colocar el tilde e informar al usuario
         * Si la contraseña es indefinida, es decir no se ha colocado, no lo muestra
         * @author bdilschneider
         */
        get correctPasswordValidation() {
            return (this.Password !== undefined || this.repeatPassword !== undefined) &&
                   (this.Password !== '' || this.repeatPassword !== '') &&
                   (this.Password === this.repeatPassword);
        }

        /**
         * Controla que las contraseñas sean incorrectas para luego colocar la cruz e informar al usuario
         * Si la contraseña es indefinida, es decir  o no se ha colocado, no lo muestra
         * @author bdilschneider
         */
        get failedPasswordValidation() {
            return (this.Password !== undefined || this.repeatPassword !== undefined) &&
                   (this.Password !== '' || this.repeatPassword !== '') &&
                   (this.Password !== this.repeatPassword);
        }
    }
