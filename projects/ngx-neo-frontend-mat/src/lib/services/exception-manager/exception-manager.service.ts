import { Injectable } from '@angular/core';
import { TimeoutError } from 'rxjs';
import { AppError } from './app-error';
import { b64DecodeUnicode } from '@neocomplexx/ngx-neo-components-mat';

@Injectable({
  providedIn: 'root'
})
export class ExceptionManagerService {

  constructor() { }

  public execute<T>(forExecute: (() => T), frendlyErrorMessage?: string | null): T {
    try {
      return forExecute();
    } catch (error) {
      this.HandleErrorMessage(error, frendlyErrorMessage);

      const appError = new AppError(error);
      appError.handled = true;
      throw appError;
    }
  }

  public async executeAsync<T>(forExecute: (() => Promise<T>), frendlyErrorMessage?: string | null,
    showErrorMessage: boolean = true, throwError: boolean = true): Promise<T> {
    // link interesante sobre mandejo de excepciones que switchea en el hilo principal: https://github.com/angular/angular/issues/6895

    try {
      return await forExecute();
    } catch (error) {
      if (showErrorMessage) { this.HandleErrorMessage(error, frendlyErrorMessage); }
      if (throwError) { throw error; }
    }
  }

  public HandleErrorMessage(error, frendlyErrorMessage?: string | null) {

    let errorMessage: string;

    if (error.ok && error.ok === true) { return; }

    if (error instanceof TimeoutError) {
      error.message = 'La conexión está demorando demasiado, intente nuevamente más tarde.';
    } else {
      if (error.headers) {
        if (error.status === 0 || error.status === 404) {
          // if (error.status === 0 || environment.production) {
          //   errorMessage = (frendlyErrorMessage) ? frendlyErrorMessage :
          //     'El sistema no se encuentra disponible en este momento, intente nuevamente más tarde.';
          // } else {
          //   errorMessage = (frendlyErrorMessage) ? frendlyErrorMessage : ((error.message) ? error.message : error.toString());
          // }
        } else if (error.status === 401) {
        } else if (error.status >= 500) {
          errorMessage = 'Temporalmente el sistema no se encuentra disponible, le agradecemos reintentar más tarde.';
        } else {
          errorMessage = error.statusText;
        }
        error.ok = true; // avisa al manejador de errores principal que ya fue informado el error al usuario.
      } else {
        errorMessage = (frendlyErrorMessage) ? frendlyErrorMessage : ((error.message) ? error.message : error.toString());
      }
    }

    if (errorMessage) {
      if (errorMessage.startsWith('data:txt;base64,')) {
        errorMessage = b64DecodeUnicode(errorMessage.substring(16));
      }

      console.log(errorMessage);
      window.alert(errorMessage);
    }
  }
}
