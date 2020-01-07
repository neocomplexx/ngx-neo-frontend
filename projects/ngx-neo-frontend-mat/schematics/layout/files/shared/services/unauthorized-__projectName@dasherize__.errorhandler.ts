import { Injectable, Injector, ErrorHandler, NgZone, Inject } from '@angular/core';
import { NgxNeoModalMatService } from '@neocomplexx/ngx-neo-modal-mat';
import { Router } from '@angular/router';
import { UnauthorizedErrorHandler, HeaderNeoComplexxService } from '@neocomplexx/ngx-neo-frontend-mat';

@Injectable()
export class Unauthorized<%=classify(projectName)%>ErrorHandler extends UnauthorizedErrorHandler {

  constructor(@Inject(Injector) injector: Injector) {
    super(injector);
  }
}
