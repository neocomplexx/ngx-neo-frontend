import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit } from '@angular/core';

@Component({
  selector: 'neo-floating-help',
  templateUrl: './neo-floating-help.component.html',
  styleUrls: ['./neo-floating-help.component.scss'],
})
export class NeoFloatingHelpComponent implements AfterContentInit {

  @Output() close = new EventEmitter<void>();

  // tslint:disable:no-input-rename
  @Input('message') message = 'Hi!';
  @Input('yPos') yPos = 0;
  @Input('xPos') xPos = 0;
  @Input('delay') showAfter = 0;
  @Input('name') name = 'floatingHelper';
  @Input('pointer') pointer = 'bottom';
  @Input('disableOnClose') disableOnClose = false;
  @Input('totalWidth') totalWidth = undefined;

  public top = '0px';
  public left = '0px';
  public width = '300px';

  public show = false;
  private hide = false;

  constructor() { }

  ngAfterContentInit() {
    this.top = `${this.yPos}px`;
    this.left = `${this.xPos}px`;
    if (this.totalWidth) {
      this.width = `${this.totalWidth}px`;
    }
    let config = JSON.parse(localStorage.getItem('helperConfig'));
    if (!config) {
      config = new Object();
      config[this.name] = true;
      localStorage.setItem('helperConfig', JSON.stringify(config));
    }
    if (config[this.name] !== undefined && config[this.name] === false) {
      this.hide = true;
    }
    setTimeout(() => { if (this.hide) { return; } this.show = true; }, this.showAfter);
  }

  public Close() {
    if (this.disableOnClose) {
      let config = JSON.parse(localStorage.getItem('helperConfig'));
      if (!config) {
        config = new Object();
      }
      config[this.name] = false;
      localStorage.setItem('helperConfig', JSON.stringify(config));
    }
    this.close.emit(null);
  }

  position(position: string) {
    return position === this.pointer;
  }

}
