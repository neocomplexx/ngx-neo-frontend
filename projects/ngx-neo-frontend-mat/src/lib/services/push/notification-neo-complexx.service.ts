import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationDTO } from '../../models/DTO/notification.DTO';
import { UserDTO } from '../../models/DTO/user.DTO';
import { NotificationPriority } from '../../models/DTO/notificationPriority.ENUM';
import { PushService } from './signalr.push.service';
import { ServiceChangeDTO } from '../../models/DTO/serviceChange.DTO';
import { NotificationState } from '../../models/DTO/notificationState.ENUM';
import { NewNotificationDTO } from '../../models/DTO/newNotification.DTO';
import { NotificationServiceBackend } from '../backend/notification.ServiceBackend';
import { NotificationService } from '@neocomplexx/ngx-neo-components-mat';
import { UsersServiceBackend } from '../backend';

@Injectable({
    providedIn: 'root'
})
export class NotificationNeoComplexxService extends NotificationService {

    private pageNumber = 0;
    protected _getMoreNotificationsEvent = new Subject<Array<NotificationDTO>>();

    public notifications: NotificationDTO[] = new Array<NotificationDTO>();

    public usersAdministrative: Array<UserDTO>;

    public notificationMaxPriority: NotificationPriority = NotificationPriority.Low;

    constructor(protected notificationServiceBackend: NotificationServiceBackend,
        protected usersServiceBackend: UsersServiceBackend, protected pushService: PushService) {
        super();

        this.pushService.registerPushFrom<NotificationDTO>('NewNotification', (notification) => {
            let notificationDTO = this.notifications.find(x => x.id == notification.id);
            if (!notificationDTO) {
                notificationDTO = new NotificationDTO();
            }
            const isNewNotification = notificationDTO.id === 0;
            notificationDTO.PrepareDTO(notification);
            if (isNewNotification) {
                this.notifications.unshift(notificationDTO);
                this.notificationsNotSeen++;
                this.notificationPriorityAnalyzer();
                this._newNotificationEvent.next(notificationDTO);
            }
        });

        this.pushService.registerPushFrom<ServiceChangeDTO>('ServiceChange', (serviceChange) => {
            if (serviceChange.serviceNotify.startsWith('/user/notifications/clearNumberInBell')) {
                this.notificationsNotSeen = 0;
            }
        });

        this.pushService.onConectedToServer(async (data) => {
            if (data) {
                await this.getAllNotification();
            }
        });
    }

    private async getAllNotification(): Promise<void> {
        const notificationsData = await this.notificationServiceBackend.getUserNotifications(true, 0, 20);
        this.notificationsNotSeen = notificationsData.notificationsNotSeen;
        this.notifications = notificationsData.data;

        this.notificationPriorityAnalyzer();

        // this.usersAdministrative = await this.usersServiceBackend.getUsers(true);

        this._getAllNotificationsEvent.next();
    }

    public async getMoreNotification(): Promise<void> {
        const notificationsData = await this.notificationServiceBackend.getUserNotifications(true, ++this.pageNumber, 20);
        notificationsData.data.forEach(notification => {
            if (this.notifications.find(x => x.id == notification.id) == null) {
                this.notifications.push(notification);
            }
        });
        this._getMoreNotificationsEvent.next(notificationsData.data);
    }

    private notificationPriorityAnalyzer(): void {
        this.notificationMaxPriority = NotificationPriority.Low;
        for (const element of this.notifications) {
            // tslint:disable-next-line:triple-equals
            if (element.state != NotificationState.NotRead) { continue; }
            // tslint:disable-next-line:triple-equals
            if (element.priority == NotificationPriority.High) {
                this.notificationMaxPriority = NotificationPriority.High;
                break;
                // tslint:disable-next-line:triple-equals
            } else if (element.priority == NotificationPriority.Medium) {
                this.notificationMaxPriority = NotificationPriority.Medium;
            }
        }
    }

    public onGetAllNotifications(newMethod: () => void): void {
        this._getAllNotificationsEvent.asObservable().subscribe(newMethod);
    }
    public onGetMoreNotifications(newMethod: (getMoreNotifications) => void): void {
        this._getMoreNotificationsEvent.asObservable().subscribe(newMethod);
    }
    public onNewNotification(newMethod: (dto: NotificationDTO) => void): void {
        this._newNotificationEvent.asObservable().subscribe(newMethod);
    }

    public async createNewNotification(title: string, details: string, usersName: string[]) {
        const notificationDTO = new NotificationDTO();
        notificationDTO.title = title;
        notificationDTO.details = details;

        const newNotificationDTO = new NewNotificationDTO();
        newNotificationDTO.notification = notificationDTO;
        newNotificationDTO.usersName = usersName;

        await this.notificationServiceBackend.insertUserNotifications(newNotificationDTO);
    }

    public async createNewNotificationToUserTypeId(title: string, details: string, userTypeId: number) {
        const notificationDTO = new NotificationDTO();
        notificationDTO.title = title;
        notificationDTO.details = details;

        const newNotificationDTO = new NewNotificationDTO();
        newNotificationDTO.notification = notificationDTO;

        await this.notificationServiceBackend.insertUserNotificationsUserTypeIdId(userTypeId, newNotificationDTO);
    }

    public async readNotification(notificationDTO: NotificationDTO): Promise<void> {
        const readedNotification = await this.notificationServiceBackend.updateUserNotificationsId(notificationDTO.id, notificationDTO);
        notificationDTO.readDateTime = readedNotification.readDateTime;
        notificationDTO.state = NotificationState.Read;

        this.notificationPriorityAnalyzer();
    }

    public async openedNotification(notificationDTO: NotificationDTO): Promise<void> {
        const readedNotification = await this.notificationServiceBackend.updateUserNotificationsIdOpened(notificationDTO.id, notificationDTO);
        notificationDTO.openDateTime = readedNotification.openDateTime;

        this.notificationPriorityAnalyzer();
    }

    public async understoodNotification(notificationDTO: NotificationDTO): Promise<void> {
        const readedNotification = await this.notificationServiceBackend.updateUserNotificationsIdUnderstood(notificationDTO.id, notificationDTO);
        notificationDTO.understoodDateTime = readedNotification.understoodDateTime;
        notificationDTO.state = NotificationState.Read;
        notificationDTO.notUnderstood = false;

        this.notificationPriorityAnalyzer();
    }

    public async notUnderstoodNotification(notificationDTO: NotificationDTO): Promise<void> {
        const readedNotification = await this.notificationServiceBackend.updateUserNotificationsIdNotUnderstood(notificationDTO.id, notificationDTO);
        notificationDTO.understoodDateTime = null;
        notificationDTO.notUnderstood = true;
        notificationDTO.state = NotificationState.Read;

        this.notificationPriorityAnalyzer();
    }

    public async archivedNotification(notificationDTO: NotificationDTO): Promise<void> {
        await this.notificationServiceBackend.deleteUserNotificationsId(notificationDTO.id);
        notificationDTO.state = NotificationState.Archived;

        this.notificationPriorityAnalyzer();
    }

    public async unArchivedNotification(notificationDTO: NotificationDTO): Promise<void> {
        await this.notificationServiceBackend.updateUserNotificationsId(notificationDTO.id, notificationDTO, true);
        notificationDTO.state = NotificationState.Read;

        this.notificationPriorityAnalyzer();
    }

    public async ClearBell(): Promise<void> {
        await this.notificationServiceBackend.insertUserNotificationsClearNumberInBell();
        this.notificationsNotSeen = 0;
    }
}
