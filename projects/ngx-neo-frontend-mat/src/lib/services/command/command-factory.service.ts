import { NgxNeoLoaderService } from '@neocomplexx/ngx-neo-loader';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Command, ICommand } from '@neocomplexx/ngx-neo-directives-mat';

@Injectable({
    providedIn: 'root'
})
export class CommandFactoryService {

    private static _loaderService: NgxNeoLoaderService = null;

    public static newCommandAsync(executeParam: (any?) => any, canExecute$?: Observable<boolean>, delay?: number): ICommand {
        const command = new Command(executeParam, canExecute$, true, delay);
        command.asyncAction = (result: any) => {
            if (result === undefined) {
                const res = CommandFactoryService._loaderService.show();
                return res;
            } else {
                CommandFactoryService._loaderService.hide(result);
                return null;
            }
        };
        return command;
    }

    constructor(private loaderService: NgxNeoLoaderService) {
        CommandFactoryService._loaderService = loaderService;
        CommandFactoryService._loaderService.DELAY_TIME = 750;
    }
}
