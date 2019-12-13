import { HeaderNeoComplexxService } from '../../services/header-neo-complexx.service';

export abstract class NeoViewModel {

    public constructor(protected headerService: HeaderNeoComplexxService) {
        this.headerService.loggedOut$.subscribe(data => {
            if (data) {
                this.initViewModel();
            }
        });
    }

    public abstract initViewModel(): Promise<void> | void;
}
