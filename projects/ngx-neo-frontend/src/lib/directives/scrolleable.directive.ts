import { Directive, HostListener, ElementRef } from '@angular/core';
import { HeaderNeoComplexxService } from '../services/header-neo-complexx.service';

@Directive({
  selector: '[neoScrolleable]'
})
export class ScrolleableDirective {

  constructor(private headerService: HeaderNeoComplexxService, private element: ElementRef) {
    this.headerService.scrolleableComponent = this.element;
  }

  @HostListener('scroll', ['$event']) public async windowScrolled(event: Event) {

    if (this.headerService.scrollSavedActivated && this.element.nativeElement['scrollTop'] > 0) {
      const scrolls = JSON.parse(localStorage.getItem('scroll')) || { screens: new Map() };
      scrolls[this.headerService.currentElement] = this.element.nativeElement['scrollTop'];
      localStorage.setItem('scroll', JSON.stringify(scrolls));
    }


    // tslint:disable-next-line:max-line-length
    if (this.element.nativeElement['scrollHeight'] - this.element.nativeElement['scrollTop'] === this.element.nativeElement['clientHeight']) {
      await this.headerService.next();
    }
  }

}
