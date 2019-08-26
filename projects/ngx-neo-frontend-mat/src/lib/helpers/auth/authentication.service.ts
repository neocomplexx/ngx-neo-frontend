import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponseDTO } from '../../models/DTO/authResponse.DTO';
import { PushService } from '../../services/push/signalr.push.service';
import { ExceptionManagerService } from '../../services/exception-manager/exception-manager.service';
import { AuthRequestDTO } from '../../models/DTO/authRequest.DTO';
import { AuthServiceBackend } from '../../services/backend/auth.ServiceBackend';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    public authResponseDTO: AuthResponseDTO;

    public loggedEvent: BehaviorSubject<AuthResponseDTO>;

    constructor(private pushService: PushService, public router: Router, private authService: AuthServiceBackend,
        private exceptionManager: ExceptionManagerService) {
        // set token if saved in local storage
        this.authResponseDTO = JSON.parse(localStorage.getItem('currentUserWeb'));
        this.loggedEvent = new BehaviorSubject<AuthResponseDTO>(this.authResponseDTO);
    }

    public login(authResponseDTO: any) {
        // store username and jwt token in local storage to keep user logged in between page refreshes
        this.authResponseDTO = authResponseDTO;
        localStorage.setItem('currentUserWeb', JSON.stringify(authResponseDTO));

        this.pushService.start(authResponseDTO);

        this.loggedEvent.next(authResponseDTO);
    }

    public async logout(): Promise<void> {
        const authRes = new AuthRequestDTO();
        authRes.token = localStorage.getItem('fcm');
        await this.exceptionManager.executeAsync(async () => {
            await this.authService.insertAuthLogout(authRes);
            this.removeInfoLogin();
        }, 'No se puede cerrar la sesión en este momento, intente nuevamente más tarde.');
    }

    public removeInfoLogin(): void {
        this.pushService.stop();
      /*   if (this.modalService.hasOpenModals()) {
            this.modalService.dismissAll();
        } */
        // clear token remove user from local storage to log user out
        this.authResponseDTO = null;
        localStorage.removeItem('currentUserWeb');
        localStorage.removeItem('scroll');
    }

}
