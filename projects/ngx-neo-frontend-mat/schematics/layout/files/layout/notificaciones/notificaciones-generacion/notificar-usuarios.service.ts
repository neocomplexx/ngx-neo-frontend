import { Injectable } from '@angular/core';
import { NotificationServiceBackend, UserDTO} from '@neocomplexx/ngx-neo-frontend';
import { NotificationDTO  } from '@neocomplexx/ngx-neo-frontend';
import { NewNotificationDTO } from '@neocomplexx/ngx-neo-frontend';
import { UsersServiceBackend } from '@neocomplexx/ngx-neo-frontend';

@Injectable({
    providedIn: 'root'
})
export class NotificarUsuariosService {

    constructor(private notificationServiceBackend: NotificationServiceBackend,
        private usersServiceBackend: UsersServiceBackend) { }

    public async notificarUsuarios(notificationDTO: NotificationDTO, usersName: Array<string>): Promise<void> {
        const newNotification = new NewNotificationDTO();
        newNotification.usersName = usersName;
        newNotification.notification = notificationDTO;

        await this.notificationServiceBackend.insertUserNotifications(newNotification);
    }

    public async obtenerUsuariosDelSistema(): Promise<Array<UserDTO>> {
        const res = await this.usersServiceBackend.getUsers(true);
        return res.sort((x, y) => x.fullName.localeCompare(y.fullName) );
    }
}
