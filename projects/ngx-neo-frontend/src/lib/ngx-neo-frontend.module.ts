import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';

export interface FrontEndConfig {
  apiURL: string;
}

export const FrontEndConfigService = new InjectionToken<FrontEndConfig>('FrontEndConfig');

@NgModule({
  declarations: [],
  imports: [
  ],
  exports: []
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
