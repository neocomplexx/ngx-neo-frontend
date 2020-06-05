import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FrontEndConfig, ExceptionManagerService, FrontEndConfigService, UsersServiceBackend } from '@neocomplexx/ngx-neo-frontend';

@Injectable({
    providedIn: 'root'
})
export class Users<%=classify(projectName) %> Service extends UsersServiceBackend {

    constructor(@Inject(FrontEndConfigService) Constants: FrontEndConfig,
        http: HttpClient, exceptionManager: ExceptionManagerService) {
        super(this.Constants, http, exceptionManager);
    }

}
