import { BehaviorSubject } from 'rxjs';
import { AuthRequestDTO } from '@neocomplexx/ngx-neo-frontend';
import { AuthRequestModelDTO } from '@neocomplexx/ngx-neo-frontend';

export class LoginModelDTO extends AuthRequestModelDTO {

    public constructor(protected entityDTO: AuthRequestDTO, private canLoginCmd: BehaviorSubject<boolean>) {
        super(entityDTO);
    }

    protected notifyChangeDTO(property: string, value: any): void {
        super.notifyChangeDTO(property, value);

        if (this.entityDTO.userName.length > 1 && this.entityDTO.password.length > 5) {
            this.canLoginCmd.next(true);
        } else {
            this.canLoginCmd.next(false); }
    }
}
