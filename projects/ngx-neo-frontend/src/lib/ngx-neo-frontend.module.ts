import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';
import { NeoFloatingHelpComponent } from './components/neo-floating-help/neo-floating-help.component';
import { CommonModule } from '@angular/common';

export interface FrontEndConfig {
  apiURL: string;
  delaySearchMilliseconds: number;
}

export const FrontEndConfigService = new InjectionToken<FrontEndConfig>('FrontEndConfig');

@NgModule({
  declarations: [NeoFloatingHelpComponent],
  imports: [
    CommonModule
  ],
  exports: [NeoFloatingHelpComponent]
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
