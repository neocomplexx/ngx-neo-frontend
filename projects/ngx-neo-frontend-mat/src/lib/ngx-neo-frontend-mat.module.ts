import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';
import { NeoFloatingHelpComponent } from './components/neo-floating-help/neo-floating-help.component';
import { CommonModule } from '@angular/common';
import { ScrolleableDirective } from './directives/scrolleable.directive';
import { FrontEndConfigService, FrontEndConfig } from './FrontendConfig';
import { HeaderNeoComplexxService } from './services/header-neo-complexx.service';




@NgModule({
  declarations: [NeoFloatingHelpComponent, ScrolleableDirective],
  imports: [
    CommonModule
  ],
  exports: [NeoFloatingHelpComponent, ScrolleableDirective],
})
export class NgxNeoFrontendMatModule {
  static forRoot(config: FrontEndConfig): ModuleWithProviders {
    return {
      ngModule: NgxNeoFrontendMatModule,
      providers: [
        {
          provide: FrontEndConfigService,
          useValue: config
        },
      ]
    };
  }
}
