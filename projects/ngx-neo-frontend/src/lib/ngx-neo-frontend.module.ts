import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';
import { NeoFloatingHelpComponent } from './components/neo-floating-help/neo-floating-help.component';
import { CommonModule } from '@angular/common';
import { ScrolleableDirective } from './directives/scrolleable.directive';
import { FrontEndConfig, FrontEndConfigService } from './FrontendConfig';

@NgModule({
  declarations: [NeoFloatingHelpComponent, ScrolleableDirective],
  imports: [
    CommonModule
  ],
  exports: [NeoFloatingHelpComponent, ScrolleableDirective]
})
export class NgxNeoFrontendModule {
  static forRoot(config: FrontEndConfig): ModuleWithProviders {
    return {
      ngModule: NgxNeoFrontendModule,
      providers: [
        {
          provide: FrontEndConfigService,
          useValue: config
        }
      ]
    };
  }
}
