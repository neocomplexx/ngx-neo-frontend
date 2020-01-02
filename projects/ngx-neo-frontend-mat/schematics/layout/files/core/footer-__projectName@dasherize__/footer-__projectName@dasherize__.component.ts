import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-<%=dasherize(projectName)%>',
  templateUrl: './footer-<%=dasherize(projectName)%>.component.html'
})
export class Footer<%=classify(projectName)%>Component implements OnInit {

  public buttons = [
    {
      callFunction: () => { console.log('Home'); return; },
      icon: 'fas fa-home',
      text: 'Home',
    },
    {
      callFunction: () => { console.log('Phone'); return; },
      icon: 'fas fa-phone',
      text: 'Phone',
    },
    {
      callFunction: () => { console.log('Info'); return; },
      icon: 'fas fa-info-circle',
      text: 'Info',
    },
    {
      callFunction: () => { console.log('Message'); return; },
      icon: 'fas fa-paper-plane',
      text: 'Message',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
