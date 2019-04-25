import { BehaviorSubject, Subject } from 'rxjs';
import { CompleterItem, CompleterData } from '@neocomplexx/ngx-neo-completer';
import { ICommand, Command } from '@neocomplexx/ngx-neo-directives';
import { Inject } from '@angular/core';
import { FrontEndConfigService, FrontEndConfig } from '../../ngx-neo-frontend.module';

export abstract class BaseEntitiesSearch extends Subject<CompleterItem[]> implements CompleterData {

    // tslint:disable-next-line:max-line-length
    public searchCmd: ICommand = new Command((value) => this.getEntitiesSearch(value), new BehaviorSubject(true), true, this.Constants.delaySearchMilliseconds);

    constructor(@Inject(FrontEndConfigService) protected Constants: FrontEndConfig) {
        super();
    }
    public search(term: string): void {
        this.searchCmd.execute(term);
    }

    public abstract async getEntitiesSearch(startWith: string): Promise<void>;

    public cancel() {
        // Handle cancel
    }
}
