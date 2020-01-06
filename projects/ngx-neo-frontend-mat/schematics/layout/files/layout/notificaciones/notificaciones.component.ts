import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@neocomplexx/ngx-neo-frontend-mat';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html'
})
export class NotificacionesComponent implements OnInit, OnDestroy {

  public esAdministrativo: boolean;

  constructor(private router: Router, authenticationService: AuthenticationService) {
    //TODO: change this
    this.esAdministrativo = true;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
