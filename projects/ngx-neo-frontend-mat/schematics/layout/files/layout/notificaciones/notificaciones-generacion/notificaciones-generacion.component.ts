import { Component, OnDestroy } from '@angular/core';
import { ICommand, Command } from '@neocomplexx/ngx-neo-directives-mat';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { NeoComponentAsync } from '@neocomplexx/ngx-neo-frontend-mat';
import { NotificationModelDTO, UserDTO } from '@neocomplexx/ngx-neo-frontend-mat';
import { NotificationDTO } from '@neocomplexx/ngx-neo-frontend-mat';
import { NotificarUsuariosService } from './notificar-usuarios.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { HeaderUaalooService } from 'src/app/core/header-uaaloo/header-uaaloo.service';
@Component({
    selector: 'app-notificaciones-generacion',
    templateUrl: './notificaciones-generacion.component.html',
})
export class NotificacionesGeneracionComponent extends NeoComponentAsync implements OnDestroy {

    public prioridades: string[];
    public notificacionModelDTO: NotificationModelDTO;
    public usuariosDelSistema: Array<UserDTO>;

    public usuariosString: Array<string>;

    public usuariosANotificar: Array<UserDTO>;
    public usuarioSeleccionado: UserDTO;

    public usuariosElegidos: Array<string>;

    public notificarATodos: boolean;

    public changedSubscribe: Subscription;

    public notificarCmd: ICommand = new Command(() => this.notificar(), new BehaviorSubject(true), true);
    public agregarUsuarioCmd: ICommand = new Command(() => this.agregarUsuario(), new BehaviorSubject(true), false);

    constructor(private notificarUsuariosService: NotificarUsuariosService,
        public headerService: HeaderUaalooService) {
        super(headerService);
        this.limpiarPantalla();
    }


    async ngOnInitAsync(): Promise<void> {
        this.prioridades = NotificationModelDTO.getNotificationPriority();
        this.usuariosDelSistema = await this.notificarUsuariosService.obtenerUsuariosDelSistema();
    }

    ngOnDestroy() {
        this.headerService.destroyComponent();
        this.changedSubscribe.unsubscribe();
    }

    /**
     * Agrego un usuario a la lista para enviarle una notificación
     * Controlo que no esté agregado previamente
     * @author bdilschneider
     */
    public agregarUsuario() {
        // Me fijo que el usuario no este agregado previamente
        if (this.usuarioSeleccionado && this.usuarioSeleccionado.id > 0) {
            let i = 0; let encontre = false;
            while (i < this.usuariosANotificar.length && !encontre) {
                if (this.usuariosANotificar[i].userName === this.usuarioSeleccionado.userName) {
                    encontre = true;
                }
                i = i + 1;
            }
            if (!encontre) {
                this.usuariosANotificar.push(this.usuarioSeleccionado);
                this.usuarioSeleccionado = undefined;
            } else {
                window.alert('El usuario ya se encuentra en la lista.');
            }
        }
    }

    /**
     * Elimino un usuario de la lista de usuarios a notificar
     * @author bdilschneider
     * @param usuario
     */
    public eliminarUsuario(usuario: UserDTO): void {
        // Busco el indice del valor y en base a eso lo remuevo
        const index = this.usuariosANotificar.indexOf(usuario);
        this.usuariosANotificar.splice(index, 1);
    }

    /**
     * Envío la notificación al grupo de usuarios seleccionado
     * @author bdilschneider
     */
    public async notificar() {
        if (((this.usuariosANotificar.length > 0 && !this.notificarATodos) ||
            (this.notificarATodos && this.usuariosANotificar.length === 0))
            && this.notificacionModelDTO.Title !== '' && this.notificacionModelDTO.Details !== '' &&
            this.notificacionModelDTO.Priority) {
            if (this.notificacionModelDTO.Title.length <= 50 && this.notificacionModelDTO.Details.length <= 225) {
                for (const u of this.usuariosANotificar) {
                    this.usuariosElegidos.push(u.userName);
                }
                await this.notificarUsuariosService.notificarUsuarios(this.notificacionModelDTO.getEntityDTO(), this.usuariosElegidos);
                window.alert('Se realizó el envío de la notificación con éxito.');
                this.limpiarPantalla();
            } else {
                window.alert('El contenido o el título superan el máximo de caracteres permitidos');
            }
        } else {
            window.alert('Complete todos los campos antes de notificar.');
        }

    }

    /**
     * Limmpio la pantalla
     * @author bdilschneider
     */
    private limpiarPantalla(): void {
        this.notificacionModelDTO = new NotificationModelDTO(new NotificationDTO());
        this.changedSubscribe = this.notificacionModelDTO.changed.subscribe((changed) => { this.headerService.notifyChange(changed); });
        this.usuariosString = new Array<string>();
        this.notificarATodos = false;
        this.headerService.notifyChange(false);
        this.usuariosElegidos = new Array<string>();
        this.usuariosANotificar = new Array<UserDTO>();
        this.usuarioSeleccionado = undefined;
    }

    /**
     * Limpio la lista de usuarios
     * @author bdilschneider
     */
    public limpiarUsuariosElegidos(): void {
        this.usuariosElegidos = new Array<string>();
        this.usuariosANotificar = new Array<UserDTO>();
    }

    // Configuracion del typeahead
    public formatter = (result: UserDTO) => result.fullName.toUpperCase();
    public searchUser = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(term => term.length < 2 ? []
                : this.usuariosDelSistema.filter(x => x.fullName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
        )
}
