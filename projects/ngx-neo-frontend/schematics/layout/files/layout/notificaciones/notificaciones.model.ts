import { NotificationModelDTO } from '@neocomplexx/ngx-neo-frontend';
import { NotificationDTO  } from '@neocomplexx/ngx-neo-frontend';
import { NotificationState } from '@neocomplexx/ngx-neo-frontend';
import { Subscription } from 'rxjs';

export class NotificacionesModel extends NotificationModelDTO  {

    public verMas: boolean;
    protected truncado: boolean;

    public visibility: string;

    constructor(entityDTO: NotificationDTO) {
        super(entityDTO);
        this.verMas = false;
        this.truncado = false;
        if (entityDTO.state === NotificationState.Archived) {
            this.visibility = 'hide';
        } else {
            this.visibility = 'show';
        }

    }

    public pasaLimiteCaracteres(): boolean {
        return this.Details.length > 140;
    }

    // Si tiene muy pocos caracteres oculto el ver Mas
    public pocosCaracteres(): boolean {
        return this.Details.length < 50;
    }

    public esTruncado(): boolean {
        return this.truncado;
    }

    public expandir(): void {
        this.verMas = true;
    }

    public contraer(): void {
        this.verMas = false;
    }

    get esArchivada(): boolean {

        return this.State === NotificationState[NotificationState.Archived];
    }

    get esLeida(): boolean {

        return this.State === NotificationState[NotificationState.Read] || this.State === NotificationState[NotificationState.Archived];
    }



}
