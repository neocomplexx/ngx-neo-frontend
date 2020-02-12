import { InjectionToken } from '@angular/core';


export const FrontEndConfigService = new InjectionToken<FrontEndConfig>('FrontEndConfig');

export interface FrontEndConfig {
    apiURL: string;
    delaySearchMilliseconds: number;
}
