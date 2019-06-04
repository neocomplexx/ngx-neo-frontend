import { Injectable, Injector, ErrorHandler, Inject } from '@angular/core';
import { UnauthorizedErrorHandler } from '@neocomplexx/ngx-neo-frontend';

@Injectable()
export class Unauthorized<%=classify(projectName)%>ErrorHandler extends UnauthorizedErrorHandler {

  constructor(@Inject(Injector) injector: Injector) {
    super(injector);
  }
}
