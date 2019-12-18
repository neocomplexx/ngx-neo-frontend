import { OnInit, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import { timer, Subscription } from 'rxjs';
import { HeaderNeoComplexxService } from '../services/header-neo-complexx.service';
import { stringHash } from '@neocomplexx/ngx-neo-components-mat';

export abstract class NeoModalAsync implements OnInit, OnDestroy {

    constructor(protected headerService: HeaderNeoComplexxService) { }

    abstract async ngOnInitAsync(): Promise<any>;

    ngOnInit() {
        let stringHashComponent = '';
        // tslint:disable-next-line:forin
        for (const key in this) {
            stringHashComponent += key;
        }
        const hashName = stringHash(stringHashComponent).toString();

        localStorage.setItem('NeoComponentAsync', hashName);
        this.ngOnInitAsync()
            .catch((error) => {
                // Elevamos la excepción solo si es unauthorized
                this.headerService.HandleErrorMessage(error);
                throw error;
            });
    }

    ngOnDestroy() { }

}

export abstract class NeoComponentAsync extends NeoModalAsync implements OnInit, OnDestroy {

    protected executeInitAsync: boolean;

    private subscriptions: Subscription;

    protected initComponent: () => Promise<void>;
    protected hashName: string;

    protected scrollDelay: number = 20;

    private _scrollSavedActivated = false;
    get scrollSavedActivated(): boolean { return this._scrollSavedActivated; }
    set scrollSavedActivated(value: boolean) { this._scrollSavedActivated = value; this.headerService.scrollSavedActivated = value; }

    constructor(protected headerService: HeaderNeoComplexxService) {
        super(headerService);
        this.executeInitAsync = true;

        this.subscriptions = new Subscription();

        this.headerService.beforeBack = undefined;

        // Me aseguro que se limpien las suscripciones aunque se haga override del ondestroy
        const originalOnDestroy = this.ngOnDestroy;

        this.ngOnDestroy = () => {
            this.destroy();
            originalOnDestroy.apply(this);
        };

        this.subscriptions.add(this.headerService.requestLoad.subscribe(async () => {
            if (this.initComponent != null) {
                await this.initComponent();
            } else {
                await this.ngOnInit();
            }
            timer(1000).subscribe((e) => {
                this.headerService.loadComplete.next();
            });
        }));

        this.headerService.next = async () => { await this.next(); };
        this.headerService.scrollSavedActivated = this._scrollSavedActivated;

        let stringHashComponent = '';
        // tslint:disable-next-line:forin
        for (const key in this) {
            stringHashComponent += key;
        }
        this.hashName = stringHash(stringHashComponent).toString();

        localStorage.setItem('NeoComponentAsync', this.hashName);
        this.headerService.currentElement = this.hashName;
    }


    ngOnInit() {
        // El ngOnInit debe ser sincronico por ello tenemos nuestro propio metodo asincroníco para trabajar
        // las cargas de datos en background que hacemos en los ngOnInit
        if (this.executeInitAsync) {
            if (!this.scrollDelay || this.scrollDelay === 0) {
                this.scrollToSaved();
            }
            this.ngOnInitAsync()
                .then((finished) => {
                    if (this.scrollDelay > 0) {
                        this.scrollToSaved();
                    }
                })
                .catch((error) => {
                    // Elevamos la excepción solo si es unauthorized
                    this.headerService.HandleErrorMessage(error);
                    throw error;
                });
        }
    }

    protected scrollToSaved() {
        if (this._scrollSavedActivated) {
            let scrollTop = 0;
            const scrolls = JSON.parse(localStorage.getItem('scroll'));
            if (scrolls) {
                scrollTop = +scrolls[this.hashName];
            }
            timer(this.scrollDelay).subscribe((e) => {
                this.headerService.scrollToPosition(0, scrollTop);
            });
        } else {
            timer(this.scrollDelay).subscribe((e) => {
                this.headerService.scrollToZero();
            });
        }
    }

    private destroy() {
        this.headerService.beforeBack = undefined;
        this.subscriptions.unsubscribe();
    }

    ngOnDestroy() { }

    // ngAfterViewInit(): void {
    //     this.headerService.scrollToZero();
    // }

    public async next() {
    }

    protected stringToDate(value: string): Date {
        if (value.length === 10) { value += 'T03:00:00Z'; }
        const date = new Date(value);
        if (date && date.getUTCFullYear() > 1900 && date.getUTCFullYear() < 3000) {
            return date;
        }
        return null;
    }

    protected dateToString(value: Date): string {
        if (value) {
            return value.toISOString().substring(0, 10);
        } else {
            return undefined;
        }
    }
}

