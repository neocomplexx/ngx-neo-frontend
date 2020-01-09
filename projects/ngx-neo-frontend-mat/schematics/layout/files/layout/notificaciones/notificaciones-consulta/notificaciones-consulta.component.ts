import { Component } from '@angular/core';
import { ICommand, Command } from '@neocomplexx/ngx-neo-directives-mat';
import { BehaviorSubject } from 'rxjs';
import { NotificationState } from '@neocomplexx/ngx-neo-frontend-mat';
import { NeoComponentAsync } from '@neocomplexx/ngx-neo-frontend-mat';
import { NotificacionesModel } from '../notificaciones.model';
import { NotificationDTO  } from '@neocomplexx/ngx-neo-frontend-mat';
import { HeaderUaalooService } from 'src/app/core/header-uaaloo/header-uaaloo.service';
import { NotificationNeoComplexxService } from '@neocomplexx/ngx-neo-frontend-mat';
// import { trigger, transition, animate, keyframes } from '@angular/animations';
// import * as kf from 'src/app/shared/services/keyframes';

@Component({
    selector: 'app-notificaciones-consulta',
    templateUrl: './notificaciones-consulta.component.html',
    // animations: [
    //     trigger('notificationAnimator', [
    //         transition('show => hide', animate(550, keyframes(kf.slideOutLeft))),
    //         transition('show => leave', animate(1000, keyframes(kf.zoomOut))),
    //     ]),
    // ]
})
export class NotificacionesConsultaComponent extends NeoComponentAsync {

    public notificacionSeleccionada: NotificacionesModel;
    public notificacionesUsuario: Array<NotificacionesModel>;
    public verArchivadas: boolean;

    public slidedNotification: NotificacionesModel;
    public undoMessage = 'Archivada';
    public undoTimeOutLapse = 5000;
    public actionText = 'Deshacer';

    // Command para leer y archivar notificaciones
    public leerCmd: ICommand = new Command((notificacion) => this.leerNotificacion(notificacion), new BehaviorSubject(true), true);

    constructor(private notificationService: NotificationNeoComplexxService, protected headerService: HeaderUaalooService) {
        super(headerService);
        this.verArchivadas = false;
    }

    async ngOnInitAsync(): Promise<void> {
        this.notificacionesUsuario = Array<NotificacionesModel>();

        if (this.notificationService.notifications.length > 0) {
            this.armarModeloNotificaciones();
        }

        this.notificationService.onGetAllNotifications(() => this.armarModeloNotificaciones());

        this.notificationService.onNewNotification((notificationDTO) =>
            this.agregarNuevaNotificacion(notificationDTO)
        );
    }

    /**
     * Agrega las notificaciones al comienzo, una vez que entra una nueva
     * @author bdilschneider
     * @param notificationDTO
     */
    private agregarNuevaNotificacion(notificationDTO: NotificationDTO): void {
        this.notificacionesUsuario.unshift(new NotificacionesModel(notificationDTO));
    }

    /**
     * Arma los modelos de notificaciones
     * @author bdilschneider
     */
    protected armarModeloNotificaciones() {
        this.notificacionesUsuario = [];
        for (const notificacion of this.notificationService.notifications) {
            const modelo = new NotificacionesModel(notificacion);
            this.notificacionesUsuario.push(modelo);
        }
    }

    /**
     * Marca una notificación como leída
     * @param notificacion
     * @author bdilschneider
     */
    protected async leerNotificacion(notificacion: NotificacionesModel): Promise<void> {
        this.notificacionSeleccionada = notificacion;
        if (notificacion.State !== NotificationState[NotificationState.Archived]) {
            notificacion.expandir();
            await this.notificationService.readNotification(notificacion.getEntityDTO());
            if (notificacion.getEntityDTO().state !== NotificationState.Archived) {
                notificacion.State = NotificationState[NotificationState.Read];
            }
        }
    }

    /**
     * Archiva una notificacion
     * @param notificacion
     * @author bdilschneider
     */

    protected archivarConEfecto(notificacion: NotificacionesModel) {
        this.slidedNotification = notificacion;
        if (notificacion.getEntityDTO().state == NotificationState.Archived) {
            notificacion.State = NotificationState[NotificationState.Read];
            notificacion.visibility = 'show';
            this.undoMessage = 'Desarchivada';
        } else {
            notificacion.visibility = 'leave';
            notificacion.State = NotificationState[NotificationState.Archived];
            this.undoMessage = 'Archivada';
        }
    }

    public async finishAction() {
        if (this.slidedNotification) {
            const slideNotAux = this.slidedNotification;
            this.slidedNotification = undefined;
            // Es al reves dado que el estado cambio al hacer el slide;
            if (slideNotAux.getEntityDTO().state == NotificationState.Archived) {
                await this.notificationService.archivedNotification(slideNotAux.getEntityDTO());
            } else {
                await this.notificationService.unArchivedNotification(slideNotAux.getEntityDTO());
            }
        }
    }

    public undoTimeOut = async (timeOutCanceled) => {
        if (!(timeOutCanceled && (this.slidedNotification == this.notificacionSeleccionada)))
            await this.finishAction();
    }

    public onUndo = () => {
        if (this.slidedNotification.getEntityDTO().state == NotificationState.Archived) {
            this.slidedNotification.State = NotificationState[NotificationState.Read];
            this.slidedNotification.visibility = 'show';
        } else {
            this.slidedNotification.visibility = 'leave';
            this.slidedNotification.State = NotificationState[NotificationState.Archived];
        }
    }


    public async onNotify(notificacion: NotificacionesModel) {
        //  if (event === 'SwipeLeft') {
        //     await this.onSwipeLeft(notificacion);
        //   }
        await this.archivarConEfecto(notificacion);
    }

}
