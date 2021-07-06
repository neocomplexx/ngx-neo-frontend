import { HubConnectionBuilder, HubConnection, IHttpConnectionOptions } from '@aspnet/signalr';
import { Injectable, Inject } from '@angular/core';
import { Subscription, Subject, timer } from 'rxjs';
import { AppError } from '../exception-manager/app-error';
import { AuthResponseDTO } from '../../models/DTO/authResponse.DTO';
import { IEntityDTO } from '../../models/DTO/entity.DTO';
import { FrontEndConfigService, FrontEndConfig } from '../../FrontendConfig';

@Injectable({
    providedIn: 'root'
})
export class PushService {

    private hubConnection: HubConnection;
    private DELAY_TIME = 5000;
    private timerSubscription: Subscription;
    private isStoped = false;

    public user: AuthResponseDTO;

    private _onConnectedEvent = new Subject();

    constructor(@Inject(FrontEndConfigService) private Constants: FrontEndConfig) {
        const thisAux = this;
        const options: IHttpConnectionOptions = {
            accessTokenFactory() {
                return thisAux.user.token;
            }
        };
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(this.Constants.apiURL + '/signalr', options)
            .build();

        this.hubConnection.onclose((error) => {
            if (error) {
                if (error.message.includes('Unauthorized')) {
                    if (this.timerSubscription) { this.timerSubscription.unsubscribe(); }
                    throw new AppError('Unauthorized', 401);
                }
                this.connection();
            }
        });
    }

    public get ConnectionIdAsync(): Promise<string> { return this.sendMessageToServer('GetMyConnectionId', null);}
    
    public start(user: AuthResponseDTO): void {
        this.user = user;
        this.isStoped = false;
        this.hubConnection
            .start()
            .then(() => {
                console.log('Connection started (1)!');
                this._onConnectedEvent.next();
            })
            .catch(error => {
                if (!this.isStoped) { this.connection(); }
            });
    }

    public stop(): void {
        this.isStoped = true;
        this.hubConnection
            .stop()
            .then(() => console.log('Connection stoped!'))
            .catch(error => console.log('Connection can not stoped!'));
    }

    private connection(): void {
        if (this.isStoped) { return; }
        this.timerSubscription = timer(this.DELAY_TIME).subscribe(x => this.timerUp(x)); // Restart connection after 3 seconds.
    }

    private timerUp(x: number): void {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
            this.timerSubscription = null;
        }
        this.hubConnection
            .start()
            .then(() => {
                console.log('Connection started (2)!');
                this._onConnectedEvent.next();
            })
            .catch(err => {
                if (err && err.message.includes('Unauthorized')) {
                    if (this.timerSubscription) { this.timerSubscription.unsubscribe(); }
                    throw new AppError('Unauthorized', 401);
                } else {
                    this.connection();
                }
            });
    }

    public onConectedToServer(onConnectedMethod: () => void): Subscription {
        return this._onConnectedEvent.asObservable().subscribe(onConnectedMethod);
    }

    public registerPushFrom<TDTO extends IEntityDTO | null>(methodName: string, newMethod: (dto: TDTO | null) => void): void {
        this.hubConnection.on(methodName, data => {
            newMethod(<TDTO>data);
        });
    }
    public unregisterPushFrom(methodName: string): void {
        this.hubConnection.off(methodName);
    }

    public async sendMessageToServer(methodName: string, message: any): Promise<any> {
        return await this.hubConnection.invoke(methodName, message);
    }
}
