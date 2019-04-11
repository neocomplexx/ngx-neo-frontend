import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExceptionManagerService } from '../exception-manager/exception-manager.service';
import { NotificationDataDTO } from '../../models/DTO/notificationData.DTO';
import { NewNotificationDTO } from '../../models/DTO/newNotification.DTO';
import { NotificationDTO } from '../../models/DTO/notification.DTO';
import { UserDTO } from '../../models/DTO/User.DTO';
import { FrontEndConfigService, FrontEndConfig } from '../../ngx-neo-frontend.module';

@Injectable({
 providedIn: 'root'
})
export class NotificationServiceBackend {

   constructor (@Inject(FrontEndConfigService) private Constants: FrontEndConfig,
   protected http: HttpClient, protected exceptionManager: ExceptionManagerService) {}

   public async getUserNotifications(archived: boolean, pageNumber: number, pageSize: number): Promise<NotificationDataDTO> {
      return this.exceptionManager.executeAsync(async () => {
      const res = await this.http.get(this.Constants.apiURL +
         '/user/notifications/' + '?archived=' + archived + '&pageNumber=' + pageNumber + '&pageSize=' + pageSize).toPromise();
      if (!res) { return  null; }
      const resDTO = new NotificationDataDTO();
      resDTO.PrepareDTO(res);
      return resDTO;
      });
   }

   public async insertUserNotifications(newNotificationDTO: NewNotificationDTO): Promise<void> {
      return this.exceptionManager.executeAsync(async () => {
      await this.http.post(this.Constants.apiURL + '/user/notifications/', newNotificationDTO).toPromise();
      });
   }

   public async insertUserNotificationsUserTypeIdId(id: number, newNotificationDTO: NewNotificationDTO): Promise<void> {
      return this.exceptionManager.executeAsync(async () => {
      await this.http.post(this.Constants.apiURL + '/user/notifications/userTypeId/' + id, newNotificationDTO).toPromise();
      });
   }

   public async insertUserNotificationsClearNumberInBell(): Promise<void> {
      return this.exceptionManager.executeAsync(async () => {
      await this.http.post(this.Constants.apiURL + '/user/notifications/clearNumberInBell', null).toPromise();
      });
   }

   public async updateUserNotificationsId(id: number,
      notificationDTO: NotificationDTO, unArchive: boolean = false): Promise<NotificationDTO> {
      return this.exceptionManager.executeAsync(async () => {
      const res = await this.http.put(this.Constants.apiURL +
         '/user/notifications/' + id + '?unArchive=' + unArchive, notificationDTO).toPromise();
      const resDTO = new NotificationDTO();
      resDTO.PrepareDTO(res);
      return resDTO;
      });
   }

   public async deleteUserNotificationsId(id: number): Promise<void> {
      return this.exceptionManager.executeAsync(async () => {
      await this.http.delete(this.Constants.apiURL + '/user/notifications/' + id).toPromise();
      });
   }

   public async getUserNotificationsId(id: number): Promise<UserDTO> {
      return this.exceptionManager.executeAsync(async () => {
      const res = await this.http.get(this.Constants.apiURL + '/user/notifications/' + id).toPromise();
      if (!res) { return  null; }
      const resDTO = new UserDTO();
      resDTO.PrepareDTO(res);
      return resDTO;
      });
   }

}
