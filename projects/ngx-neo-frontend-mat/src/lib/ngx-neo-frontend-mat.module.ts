import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';
import { NeoFloatingHelpComponent } from './components/neo-floating-help/neo-floating-help.component';
import { CommonModule } from '@angular/common';
import { ScrolleableDirective } from './directives/scrolleable.directive';

export interface FrontEndConfig {
  apiURL: string;
  delaySearchMilliseconds: number;
}

export const FrontEndConfigService = new InjectionToken<FrontEndConfig>('FrontEndConfig');

@NgModule({
  declarations: [NeoFloatingHelpComponent, ScrolleableDirective],
  imports: [
    CommonModule
  ],
  exports: [NeoFloatingHelpComponent, ScrolleableDirective]
})
export class NgxNeoFrontendMatModule {
  static forRoot(config: FrontEndConfig): ModuleWithProviders {
    return {
      ngModule: NgxNeoFrontendMatModule,
      providers: [
        {
          provide: FrontEndConfigService,
          useValue: config
        }
      ]
    };
  }
}
