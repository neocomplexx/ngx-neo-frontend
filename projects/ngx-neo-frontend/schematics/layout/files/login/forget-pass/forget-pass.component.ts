import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ICommand, Command } from '@neocomplexx/ngx-neo-directives';
import { BehaviorSubject } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ForgetPassService } from './forget-pass.service';

@Component({
  selector: 'neo-forget-pass',
  templateUrl: './forget-pass.component.html'
})
export class ForgetPassComponent implements AfterViewInit {

  @ViewChild('inpUserName', { static: false }) inpUserName: ElementRef;

  public userName: string;
  public reestablecerExitoso: boolean;

  // Commands
  public refreshPassCmd: ICommand = new Command(() => this.refreshPass(), new BehaviorSubject(true), true);

  constructor( public activeModal: NgbActiveModal, private forgetPassService: ForgetPassService) {
    this.userName = '';
    this.reestablecerExitoso = false;
  }

  ngAfterViewInit() {
  }

  public async refreshPass(): Promise<void> {
    this.activeModal.close('Close click');
  }
}
