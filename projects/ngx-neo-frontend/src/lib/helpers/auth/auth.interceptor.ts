import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;

    if (this.authenticationService.authResponseDTO && this.authenticationService.authResponseDTO.token) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', this.authenticationService.authResponseDTO.token)
      });

      if (req.url.includes('BLOB=true')) {
        authReq = authReq.clone({responseType: 'blob'});
      } else if (req.url.includes('BLOB=XLSX')) {
        authReq = authReq.clone({responseType: 'blob', headers: authReq.headers.set('Accept', 'xlsx')});
      } else if (req.url.includes('BLOB=PDF')) {
        authReq = authReq.clone({responseType: 'blob', headers: authReq.headers.set('Accept', 'pdf')});
      }
    }

    return next.handle(authReq);
  }
}
