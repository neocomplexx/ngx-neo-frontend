import { HeaderNeoComplexxService } from '../../services/header-neo-complexx.service';
import { NeoComponentAsync } from '../neo-component-async.component';
import { NeoViewModel } from './neo-view-model';

export abstract class NeoComponentViewModel<TViewModel extends NeoViewModel> extends NeoComponentAsync {

    constructor(protected headerService: HeaderNeoComplexxService, public viewModel: TViewModel) {
        super(headerService);

        this.scrollSavedActivated = true;
        this.scrollDelay = 0;

        this.headerService.beforeBack = (beforeBackArgs) => {
            this.viewModel.initViewModel();
        };
    }
}
