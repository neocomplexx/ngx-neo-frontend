import { HeaderNeoComplexxService } from '../../services/header-neo-complexx.service';
import { NeoComponentAsync } from '../neo-component-async.component';
import { NeoViewModel } from './neo-view-model';
import { Subscription, timer } from 'rxjs';
import { OnDestroy } from '@angular/core';

export abstract class NeoComponentViewModel<TViewModel extends NeoViewModel> extends NeoComponentAsync implements OnDestroy {

    private subs = new Subscription();

    constructor(protected headerService: HeaderNeoComplexxService, public viewModel: TViewModel) {
        super(headerService);
        this.executeInitAsync = false;
        this.scrollSavedActivated = true;
        this.scrollDelay = 0;

        this.headerService.beforeBack = (beforeBackArgs) => {
            this.viewModel.initViewModel();
        };

        this.subs.add(timer(10).subscribe(() => {
            if (!this.scrollDelay || this.scrollDelay === 0) {
                this.scrollToSaved();
            }
            this.ngOnInitAsync();
        }));
    }

    public ngOnDestroy() {
        super.ngOnDestroy();
        this.subs.unsubscribe();
    }
}
