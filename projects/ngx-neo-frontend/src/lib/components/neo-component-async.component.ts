import { OnInit, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import { timer, Subscription } from 'rxjs';
import { HeaderNeoComplexxService } from '../services/header-neo-complexx.service';

export abstract class NeoModalAsync implements OnInit, OnDestroy {

    constructor(protected headerService: HeaderNeoComplexxService) {}

    abstract async ngOnInitAsync(): Promise<any>;

    ngOnInit() {
        localStorage.setItem('NeoComponentAsync', this.constructor.name);
        this.ngOnInitAsync()
            .catch((error) => {
                // Elevamos la excepción solo si es unauthorized
                this.headerService.HandleErrorMessage(error);
                throw error;
            });
    }

    ngOnDestroy() { }

}

export abstract class NeoComponentAsyncWithoutScroll extends NeoModalAsync implements OnInit, AfterViewInit, OnDestroy {

    protected scrollSavedActivated = false;

    protected initComponent: () => Promise<void>;

    private subscriptions: Subscription;

    constructor(protected headerService: HeaderNeoComplexxService) {
        super(headerService);

        this.subscriptions = new Subscription();

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
    }


    ngOnInit() {
        localStorage.setItem('NeoComponentAsync', this.constructor.name);

        // El ngOnInit debe ser sincronico por ello tenemos nuestro propio metodo asincroníco para trabajar
        // las cargas de datos en background que hacemos en los ngOnInit
        this.ngOnInitAsync()
            .then((finished) => {
                if (this.scrollSavedActivated) {
                    let scrollTop = 0;
                    const scrolls = JSON.parse(localStorage.getItem('scroll'));
                    if (scrolls) {
                        scrollTop = +scrolls[this.constructor.name];
                    }
                    timer(20).subscribe((e) => {
                        window.scrollTo(0, scrollTop);
                    });
                }
            })
            .catch((error) => {
                // Elevamos la excepción solo si es unauthorized
                this.headerService.HandleErrorMessage(error);
                throw error;
            });
    }

    private destroy() {
        this.subscriptions.unsubscribe();
    }

    ngOnDestroy() { }


    ngAfterViewInit(): void {
        //  console.log('scrol top ngAfterViewInit on' + this.constructor.name);
        window.scrollTo(0, 0);

        const e = document.getElementsByClassName('tab-content')[0];
        if (e !== undefined) {
            e.addEventListener('scroll', async (event) => {
                const element = event.target;
                if (element['scrollHeight'] - element['scrollTop'] === element['clientHeight']) {
                    await this.next();
                }
            });
        } else {
            const f = document.getElementsByClassName('overflow-scroll')[0];
            if (f !== undefined) {
                f.addEventListener('scroll', async (event) => {
                    const element = event.target;
                    if (element['scrollHeight'] - element['scrollTop'] === element['clientHeight']) {
                        await this.next();
                    }
                });
            }
        }
    }

    public async next() {
        // console.log('scrolling... next page on ' + this.constructor.name);
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

export abstract class NeoComponentAsync extends NeoComponentAsyncWithoutScroll {

    constructor(protected headerService: HeaderNeoComplexxService) {
        super(headerService);
    }

    @HostListener('window:scroll', ['$event']) public async windowScrolled(event: Event) {
        const element: any = (<Document>event.target).scrollingElement;

        if (this.scrollSavedActivated && element['scrollTop'] > 0) {
            const scrolls = JSON.parse(localStorage.getItem('scroll')) || { screens: new Map() };
            scrolls[this.constructor.name] = element['scrollTop'];
            localStorage.setItem('scroll', JSON.stringify(scrolls));
        }

        if (element['scrollHeight'] - element['scrollTop'] === element['clientHeight']) {
            await this.next();
        }
    }
}

