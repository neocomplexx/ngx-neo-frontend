import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService, AuthInterceptor } from '@neocomplexx/ngx-neo-frontend-mat';


@Injectable()
export class Auth<%=classify(projectName)%>Interceptor extends AuthInterceptor {
  constructor(authenticationService: AuthenticationService) { 
    super(authenticationService);
  }

}
