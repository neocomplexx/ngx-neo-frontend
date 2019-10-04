import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { NamedBlobDTO } from '../../models/DTO/namedBlob.DTO';

export enum ScreenOrientation { Portrait = 'portrait', Landscape = 'landscape' }

declare var device: any; // For typecript compilation

function _window(): any {
  // return the global native browser window object
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class CordovaService {


  private _resume: BehaviorSubject<boolean>;

  public resume: Observable<boolean>;

  constructor(private zone: NgZone) {

    this._resume = new BehaviorSubject<boolean>(null);
    this.resume = this._resume.asObservable();

    fromEvent(document, 'resume').subscribe(event => {
      this.zone.run(() => {
        this.onResume();
      });
    });
  }

  get cordova(): any {
    return _window().cordova;
  }

  get isCordovaApp(): boolean {
    return _window().hasOwnProperty('cordova');
  }

  get isAngularApp(): boolean {
    return !this.isCordovaApp;
  }

  get platform(): string {
    if (this.isCordovaApp) {
      return device.platform;
    } else {
      return 'Angular';
    }
  }

  get deviceVersion(): string {
    if (this.isCordovaApp) {
      return device.version;
    } else {
      return _window().navigator.appVersion;
    }

  }

  get deviceUuid(): string {
    if (this.isCordovaApp) {
      return device.uuid;
    } else {
      return null;
    }
  }

  get isIOSApp() {
    return this.platform === 'iOS';
  }

  get isAndroidApp() {
    return this.platform === 'Android';
  }

  public onResume(): void {
    this._resume.next(true);
  }

  public lockScreen(screenOrientation: ScreenOrientation) {
    screen.orientation.lock(screenOrientation);
  }

  public unlockScreen() {
    screen.orientation.unlock();
  }

  public download(namedBlob: NamedBlobDTO) {
    const url = URL.createObjectURL(namedBlob.blob);
    (window as any).requestFileSystem(0, 0, (fs) => {
      fs.root.getFile(namedBlob.name, { create: true, exclusive: false }, (fileEntry) => {
        // Create a FileWriter object for our FileEntry (log.txt).
        fileEntry.createWriter((fileWriter) => {

          fileWriter.onwriteend = (e) => {
            console.log('Write completed.');
            (window as any).cordova.plugins.fileOpener2.open(
              fileEntry.toURL(), // You can also use a Cordova-style file uri: cdvfile://localhost/persistent/Downloads/starwars.pdf
              namedBlob.mimeType,
              {
                error: (error: any) => {
                  console.log('Error status: ' + error.status + ' - Error message: ' + error.message);
                },
                success: () => {
                  console.log('file opened successfully');
                }
              }
            );
          };

          fileWriter.onerror = function (e) {
            console.log('Write failed: ' + e.toString());
          };

          fileWriter.write(namedBlob.blob);
        });
      }, function (err) { console.error('error getting file! ' + err); });
    }, function (err) { console.error('error getting persistent fs! ' + err); });
  }

  public setStatusBarBlack() {
    (window as any).StatusBar.styleDefault();
  }

  public setStatusBarWhite() {
    (window as any).StatusBar.styleLightContent();
  }

  public backgroundColorByHexString(colorHex: string) {
    (window as any).StatusBar.backgroundColorByHexString(colorHex);
  }

}
