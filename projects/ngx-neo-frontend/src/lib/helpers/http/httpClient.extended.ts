import { Injectable } from '@angular/core';
import { timeout, catchError, tap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { NgxNeoLoaderService } from '@neocomplexx/ngx-neo-loader';
import { Observable, throwError } from 'rxjs';
import { b64DecodeUnicode } from '@neocomplexx/ngx-neo-components';
import { CordovaService } from '../../services/cordova/cordova.service';

@Injectable()
export class HttpClientExtended extends HttpClient {

    public LoaderActivo = true;
    public TIMEOUT = 60000;

    constructor(handler: HttpHandler, public loaderService: NgxNeoLoaderService,
        public router: Router, private cordovaService: CordovaService) {
        super(handler);
        loaderService.DELAY_TIME = 1000;
    }

    public get(url: string, options?): Observable<any> {
        const loaderSub = this.showLoader();
        return super.get(url, options).pipe(
            timeout(this.TIMEOUT),
            catchError((error: any, caught: Observable<any>) => {
                return this.onCatch(error, caught, loaderSub);
            }),
            tap((res: Response) => {
                this.onSuccess(res, loaderSub);
            }, (error: any) => {
                this.onError(error, loaderSub);
            }),
            finalize(() => {
                this.onEnd(loaderSub);
            }));
    }

    public post(url: string, body: any, options?): Observable<any> {
        const loaderSub = this.showLoader();
        return super.post(url, body, options).pipe(
            timeout(this.TIMEOUT),
            catchError((error: any, caught: Observable<any>) => {
                return this.onCatch(error, caught, loaderSub);
            }),
            tap((res: Response) => {
                this.onSuccess(res, loaderSub);
            }, (error: any) => {
                this.onError(error, loaderSub);
            }),
            finalize(() => {
                this.onEnd(loaderSub);
            }));
    }

    public put(url: string, body: any, options?): Observable<any> {
        const loaderSub = this.showLoader();
        return super.put(url, body, options).pipe(
            timeout(this.TIMEOUT),
            catchError((error: any, caught: Observable<any>) => {
                return this.onCatch(error, caught, loaderSub);
            }),
            tap((res: Response) => {
                this.onSuccess(res, loaderSub);
            }, (error: any) => {
                this.onError(error, loaderSub);
            }), finalize(() => {
                this.onEnd(loaderSub);
            }));
    }

    public deleteResponse(url: string): Observable<any> {
        const loaderSub = this.showLoader();
        return super.delete(url, { observe: 'response' }).pipe(
            timeout(this.TIMEOUT),
            catchError((error: any, caught: Observable<any>) => {
                return this.onCatch(error, caught, loaderSub);
            }),
            tap((res: Response) => {
                this.onSuccess(res, loaderSub);
            }, (error: any) => {
                this.onError(error, loaderSub);
            }),
            finalize(() => {
                this.onEnd(loaderSub);
            }));
    }

    public delete(url: string): Observable<any> {
        const loaderSub = this.showLoader();
        return super.delete(url).pipe(
            timeout(this.TIMEOUT),
            catchError((error: any, caught: Observable<any>) => {
                return this.onCatch(error, caught, loaderSub);
            }), tap((res: Response) => {
                this.onSuccess(res, loaderSub);
            }, (error: any) => {
                this.onError(error, loaderSub);
            }), finalize(() => {
                this.onEnd(loaderSub);
            }));
    }

    public onCatch(error: any, caught: Observable<any>, loaderSub: any): Observable<any> {
        this.hideLoader(loaderSub);
        const neoError = error.headers ? error.headers.get("x-neo-error") : null;
        if (neoError && (!error.statusText || error.statusText == '' || error.statusText == 'Bad Request' || error.statusText == 'OK')) {
            error.statusText = neoError;
        }
        if (error.statusText && error.statusText.startsWith('data:txt;base64,')) {
            error.statusText = b64DecodeUnicode(error.statusText.substring(16));
        }

        return throwError(error);
    }

    public onSuccess(res: Response, loaderSub: any): void {
        // this.hideLoader(loaderSub);
        // console.log('Request successful');
    }

    public onError(res: Response, loaderSub: any): void {
        // console.log('Error, status code: ' + res.status);
        // this.hideLoader(loaderSub);
        // await window.alert('error llamada get')
    }

    public onEnd(loaderSub: any): void {
        this.hideLoader(loaderSub);
    }

    public showLoader(): any {
        if (this.LoaderActivo && !this.cordovaService.isCordovaApp) {
            return this.loaderService.show();
        }
    }

    public hideLoader(sub: any) {
        if (this.LoaderActivo && sub && !this.cordovaService.isCordovaApp) {
            this.loaderService.hide(sub);
        } else {
            this.LoaderActivo = true;
        }
    }
}
