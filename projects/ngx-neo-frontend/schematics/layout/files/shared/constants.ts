import { environment } from 'src/environments/environment';

export const urlAPI = environment.production ? 
    'http://neocomplexx.ddns.net:8281' 
    : 
    'http://192.168.1.254:8281'; 

export const searchDelay = 200;

export class Constants {

    public static get apiURL(): string {
        return urlAPI;
    }

    public static get delaySearchMilliseconds(): number { return searchDelay; }
}
