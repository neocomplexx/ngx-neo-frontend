/**
 * @author Sebastian Larrieu
 * @email slarrieu@team.neocomplexx.com
 * @create date 2019-02-07 09:27:53
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PushNotificationStatic, PushNotification, NotificationEventResponse, RegistrationEventResponse } from './push.interfaces';


declare var PushNotification: PushNotificationStatic;


@Injectable({
  providedIn: 'root'
})
export class NativePushNotificationService {

  private push: PushNotification;

  private _onNotification = new BehaviorSubject<NotificationEventResponse>(null);
  public onNotification = this._onNotification.asObservable();

  private _onRegistration = new BehaviorSubject<RegistrationEventResponse>(null);
  public onRegistration = this._onRegistration.asObservable();

  private _onError = new BehaviorSubject<Error>(null);
  public onError = this._onError.asObservable();

  constructor() { }

  public init() {
    this.push = PushNotification.init({
      android: {
        senderID: '316426687067',
        sound: true,
        icon: 'notification_icon',
        iconColor: '#F0AB00'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      }
    });

    this.push.on('notification', (data: NotificationEventResponse) => {
      this._onNotification.next(data);
    });

    this.push.on('registration', (data: RegistrationEventResponse) => {
      this._onRegistration.next(data);
    });

    this.push.on('error', (error: Error) => {
      this._onError.next(error);
    });
  }

}
