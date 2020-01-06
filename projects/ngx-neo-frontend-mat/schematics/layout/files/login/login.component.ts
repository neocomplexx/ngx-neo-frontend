import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Command, ICommand } from '@neocomplexx/ngx-neo-directives';
import { BehaviorSubject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { AuthRequestDTO } from '@neocomplexx/ngx-neo-frontend-mat';
import { AuthenticationService } from '@neocomplexx/ngx-neo-frontend-mat';
import { AuthServiceBackend } from '@neocomplexx/ngx-neo-frontend-mat';
import { LoginModelDTO } from './login.model';
import { CordovaService } from '@neocomplexx/ngx-neo-frontend-mat';
import { TypeSocial } from '@neocomplexx/ngx-neo-frontend-mat';
import { NgxNeoModalService } from '@neocomplexx/ngx-neo-modal';
import { Header<%=classify(projectName)%>Service } from 'src/app/core/header-<%=dasherize(projectName)%>/header-<%=dasherize(projectName)%>.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginCmd: ICommand = new Command(() => this.onLoggedin(), new BehaviorSubject(true), true);
  public forgetPassCmd: ICommand = new Command(() => this.forgetPass(), new BehaviorSubject(true), true);
  public noUsuarioCmd: ICommand = new Command(() => this.noUsuario(), new BehaviorSubject(true), true);

  public userPass: LoginModelDTO = new LoginModelDTO(new AuthRequestDTO(), new BehaviorSubject(true));

  public searching = false;

  constructor(private router: Router, private location: Location,
    private neoModal: NgxNeoModalService,
    private authenticationService: AuthenticationService, private authServiceBackend: AuthServiceBackend,
    private headerService: Header<%=classify(projectName)%>Service, private cordovaService: CordovaService,
    private ngbModal: NgbModal) {
  }

  ngOnInit() {
    if (this.cordovaService.isIOSApp) {
      this.cordovaService.setStatusBarWhite();
    }
  }

  ngOnDestroy() {
    if (this.cordovaService.isIOSApp) {
      this.cordovaService.setStatusBarBlack();
    }
  }

  public async onLoggedin(): Promise<void> {
    this.authenticationService.removeInfoLogin();
    try {
      this.searching = true;
      if (this.cordovaService.isIOSApp) {
        this.userPass.getEntityDTO().typeSocial = TypeSocial.APPLE_DEVICEID;
        this.userPass.Token = localStorage.getItem('fcm');
      }
      if (this.cordovaService.isAndroidApp) {
        this.userPass.getEntityDTO().typeSocial = TypeSocial.FIREBASE;
        this.userPass.Token = localStorage.getItem('fcm');
      }
      const res = await this.authServiceBackend.insertAuth(this.userPass.getEntityDTO());
      this.searching = false;
      if (this.cordovaService.isCordovaApp && (res.role as any).name === 'Administrador') {
        await alert('Usuario invalido');
      } else {
        this.authenticationService.login(res);
        await this.router.navigate(['/layout']);
        this.headerService.closeComponent();
      }
    } catch (ex) {
      this.searching = false;
      if (ex.status === 401) {
        await alert('Usuario o contraseña incorrectos');
      } else if (ex.status === 405) {
        await alert('El usuario ingresado se encuentra inactivo, comuniquese con la administración.');
      }
    }
  }

  public async forgetPass() {
    const modalRef = this.ngbModal.open(ForgetPassComponent, { centered: true });
    try {
      await modalRef.result;
    } catch (exception) {

    }
  }

  private async noUsuario() {
    await this.neoModal.info('Para obtener un usuario comuniquese con Mendéndez & Cia.');
  }
}
