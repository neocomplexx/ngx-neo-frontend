import { Injectable, Inject } from '@angular/core';
import { DataDTO, NamedBlobDTO } from '../../models';
import { ExceptionManagerService } from '../exception-manager/exception-manager.service';
import { FrontEndConfigService, FrontEndConfig } from '../../FrontendConfig';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AuditLogEntryDTO } from '../../models';
import { ListOfIdsDTO } from '../../models';
import { NewNotificationDTO } from '../../models';
import { NotificationAttachmentsDTO } from '../../models';
import { NotificationDataDTO } from '../../models';
import { NotificationDTO } from '../../models';
import { NotificationStatsDTO } from '../../models';
import { UserDTO } from '../../models';

@Injectable({
   providedIn: 'root'
})
export class NotificationServiceBackend {

   constructor(@Inject(FrontEndConfigService) protected Constants: FrontEndConfig,
      protected http: HttpClient, protected exceptionManager: ExceptionManagerService) { }

   public async getUserNotificationsIdAuditory(id: number): Promise<Array<AuditLogEntryDTO>> {
      return this.exceptionManager.executeAsync(async () => {
         const res = await this.http.get<DataDTO>(this.Constants.apiURL + '/user/notifications/' + id + '/Auditory').toPromise();
         const resJson = res.data;
         const resDTO = new Array<AuditLogEntryDTO>();
         for (const item of resJson) {
            const itemDTO = new AuditLogEntryDTO();
            itemDTO.PrepareDTO(item);
            resDTO.push(itemDTO);
         }
         return resDTO;
      });
   }

   public async getUserNotifications(archived: boolean, pageNumber: number, pageSize: number): Promise<NotificationDataDTO> {
      return this.exceptionManager.executeAsync(async () => {
         const res = await this.http.get(this.Constants.apiURL + '/user/notifications/' + '?archived=' + archived +
            '&pageNumber=' + pageNumber +
            '&pageSize=' + pageSize).toPromise();
         if (!res) { return null; }
         const resDTO = new NotificationDataDTO();
         resDTO.PrepareDTO(res);
         return resDTO;
      });
   }

   public async getUserNotificationsTipo(archived: boolean, pageNumber: number, pageSize: number, tipo: number = -1): Promise<NotificationDataDTO> {
      return this.exceptionManager.executeAsync(async () => {
         const res = await this.http.get(this.Constants.apiURL + '/user/notifications/tipo' + '?archived=' + archived +
            '&pageNumber=' + pageNumber +
            '&pageSize=' + pageSize +
            '&tipo=' + tipo).toPromise();
         if (!res) { return null; }
         const resDTO = new NotificationDataDTO();
         resDTO.PrepareDTO(res);
         return resDTO;
      });
   }

   public async getUserNotificationsStaticsByType(type: number = -1, archived: boolean = true): Promise<Array<NotificationStatsDTO>> {
      return this.exceptionManager.executeAsync(async () => {
         const res = await this.http.get<DataDTO>(this.Constants.apiURL + '/user/notifications/staticsByType' + '?type=' + type +
            '&archived=' + archived).toPromise();
         const resJson = res.data;
         const resDTO = new Array<NotificationStatsDTO>();
         for (const item of resJson) {
            const itemDTO = new NotificationStatsDTO();
            itemDTO.PrepareDTO(item);
            resDTO.push(itemDTO);
         }
         return resDTO;
      });
   }

   public async getUserNotificationsLast(type: number = -1): Promise<NotificationDTO> {
      return this.exceptionManager.executeAsync(async () => {
         const res = await this.http.get(this.Constants.apiURL + '/user/notifications/last' + '?type=' + type).toPromise();
         if (!res) { return null; }
         const resDTO = new NotificationDTO();
         resDTO.PrepareDTO(res);
         return resDTO;
      });
   }

   public async getUserNotificationsTotalWithoutRead(type: number = -1): Promise<NotificationDataDTO> {
      return this.exceptionManager.executeAsync(async () => {
         const res = await this.http.get(this.Constants.apiURL + '/user/notifications/totalWithoutRead' + '?type=' + type).toPromise();
         if (!res) { return null; }
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

   public async insertUserNotificationsUserTypeVALUE(vALUE: number, notificationDTO: NotificationDTO): Promise<void> {
      return this.exceptionManager.executeAsync(async () => {
         await this.http.post(this.Constants.apiURL + '/user/notifications/userType/' + vALUE, notificationDTO).toPromise();
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

   public async updateUserNotificationsId(id: number, notificationDTO: NotificationDTO, unArchive: boolean = false): Promise<NotificationDTO> {
      return this.exceptionManager.executeAsync(async () => {
         const res = await this.http.put(this.Constants.apiURL + '/user/notifications/' + id + '?unArchive=' + unArchive, notificationDTO).toPromise();
         const resDTO = new NotificationDTO();
         resDTO.PrepareDTO(res);
         return resDTO;
      });
   }

   public async updateUserNotificationsStatsId(id: number): Promise<NotificationDTO> {
      return this.exceptionManager.executeAsync(async () => {
         const res = await this.http.put(this.Constants.apiURL + '/user/notifications/stats/' + id, null).toPromise();
         const resDTO = new NotificationDTO();
         resDTO.PrepareDTO(res);
         return resDTO;
      });
   }

   public async updateUserNotificationsIdOpened(id: number, notificationDTO: NotificationDTO, unArchive: boolean = false): Promise<NotificationDTO> {
      return this.exceptionManager.executeAsync(async () => {
         const res = await this.http.put(this.Constants.apiURL + '/user/notifications/' + id + '/opened' + '?unArchive=' + unArchive, notificationDTO).toPromise();
         const resDTO = new NotificationDTO();
         resDTO.PrepareDTO(res);
         return resDTO;
      });
   }

   public async updateUserNotificationsIdUnderstood(id: number, notificationDTO: NotificationDTO, unArchive: boolean = false): Promise<NotificationDTO> {
      return this.exceptionManager.executeAsync(async () => {
         const res = await this.http.put(this.Constants.apiURL + '/user/notifications/' + id + '/understood' + '?unArchive=' + unArchive, notificationDTO).toPromise();
         const resDTO = new NotificationDTO();
         resDTO.PrepareDTO(res);
         return resDTO;
      });
   }

   public async updateUserNotificationsIdNotUnderstood(id: number, notificationDTO: NotificationDTO, unArchive: boolean = false): Promise<NotificationDTO> {
      return this.exceptionManager.executeAsync(async () => {
         const res = await this.http.put(this.Constants.apiURL + '/user/notifications/' + id + '/notUnderstood' + '?unArchive=' + unArchive, notificationDTO).toPromise();
         const resDTO = new NotificationDTO();
         resDTO.PrepareDTO(res);
         return resDTO;
      });
   }

   public async updateUserNotificationsArchive(listOfIdsDTO: ListOfIdsDTO): Promise<void> {
      return this.exceptionManager.executeAsync(async () => {
         await this.http.put(this.Constants.apiURL + '/user/notifications/archive', listOfIdsDTO).toPromise();
      });
   }

   public async deleteUserNotificationsId(id: number): Promise<void> {
      return this.exceptionManager.executeAsync(async () => {
         await this.http.delete(this.Constants.apiURL + '/user/notifications/' + id).toPromise();
      });
   }

   public async deleteUserNotificationsStatsId(id: number): Promise<void> {
      return this.exceptionManager.executeAsync(async () => {
         await this.http.delete(this.Constants.apiURL + '/user/notifications/stats/' + id).toPromise();
      });
   }

   public async getUserNotificationsId(id: number): Promise<NotificationAttachmentsDTO> {
      return this.exceptionManager.executeAsync(async () => {
         const res = await this.http.get(this.Constants.apiURL + '/user/notifications/' + id).toPromise();
         if (!res) { return null; }
         const resDTO = new NotificationAttachmentsDTO();
         resDTO.PrepareDTO(res);
         return resDTO;
      });
   }

   public async getUserNotificationsIdNotification(id: number): Promise<NotificationAttachmentsDTO> {
      return this.exceptionManager.executeAsync(async () => {
         const res = await this.http.get(this.Constants.apiURL + '/user/notifications/' + id + '/notification').toPromise();
         if (!res) { return null; }
         const resDTO = new NotificationAttachmentsDTO();
         resDTO.PrepareDTO(res);
         return resDTO;
      });
   }

   public async getUserNotificationsNotificationId(id: number): Promise<NotificationAttachmentsDTO> {
      return this.exceptionManager.executeAsync(async () => {
         const res = await this.http.get(this.Constants.apiURL + '/user/notifications/notification/' + id).toPromise();
         if (!res) { return null; }
         const resDTO = new NotificationAttachmentsDTO();
         resDTO.PrepareDTO(res);
         return resDTO;
      });
   }

}
