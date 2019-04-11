import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationDTO } from '../../models/DTO/notification.DTO';
import { UserDTO } from '../../models/DTO/User.DTO';
import { NotificationPriority } from '../../models/DTO/notificationPriority.ENUM';
import { UsersServiceBackend } from '../backend/users.service.backend';
import { PushService } from './signalr.push.service';
import { ServiceChangeDTO } from '../../models/DTO/serviceChange.DTO';
import { NotificationState } from '../../models/DTO/notificationState.ENUM';
import { NewNotificationDTO } from '../../models/DTO/newNotification.DTO';
import { NotificationServiceBackend } from '../backend/notification.ServiceBackend';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    private _getAllNotificationsEvent = new Subject<void>();
    private _newNotificationEvent = new Subject<NotificationDTO>();

    public notifications: NotificationDTO[] = new Array<NotificationDTO>();
    public notificationsNotSeen = 0;

    public usersAdministrative: Array<UserDTO>;

    public notificationMaxPriority: NotificationPriority = NotificationPriority.Low;

    constructor(private notificationServiceBackend: NotificationServiceBackend,
                private usersServiceBackend: UsersServiceBackend, public pushService: PushService) {

        this.pushService.registerPushFrom<NotificationDTO>('NewNotification', (notification) => {
            const notificationDTO = new NotificationDTO();
            notificationDTO.PrepareDTO(notification);
            this.notifications.unshift(notificationDTO);
            this.notificationsNotSeen++;

            this.notificationPriorityAnalyzer();
            this._newNotificationEvent.next(notificationDTO);
        });

        this.pushService.registerPushFrom<ServiceChangeDTO>('ServiceChange', (serviceChange) => {
            if (serviceChange.serviceNotify.startsWith('/user/notifications/clearNumberInBell')) {
                this.notificationsNotSeen = 0;
            }
        });

        this.pushService.onConectedToServer(async () => {
            await this.getAllNotification();
        });
    }
    private async getAllNotification(): Promise<void> {
        const notificationsData = await this.notificationServiceBackend.getUserNotifications(true, 0, 20);
        this.notificationsNotSeen = notificationsData.notificationsNotSeen;
        this.notifications = notificationsData.data;

        this.notificationPriorityAnalyzer();

        this.usersAdministrative = await this.usersServiceBackend.getUsers(true);

        this._getAllNotificationsEvent.next();
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
