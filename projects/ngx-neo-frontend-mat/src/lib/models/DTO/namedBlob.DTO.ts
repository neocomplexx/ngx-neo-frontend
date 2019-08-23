import { HttpResponse } from '@angular/common/http';

export class NamedBlobDTO {

    private _blob: Blob;
    private _name: string;

    set blob(value: Blob) { this._blob = value; }
    get blob(){ return this._blob; }

    set name(value: string) { this._name = value; }
    get name() { return this._name; }

    get mimeType() { return this.cordovaMimeType(); }

    constructor() {}

    private cordovaMimeType(): string {
        const extension = this.getExtension();
        switch (extension) {
            case 'pdf':
                return 'application/pdf';
            case 'xlsx':
                return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            default:
                return 'text/plain';
        }
    }

    private getExtension(): string {
        if (this._name) {
            return  this._name.split('.').pop();
        } else {
            return null;
        }
    }

    public setBlobNameFromHttpResponse(httpResponse: HttpResponse<Blob>): void {
      const contentDispositionHeader = httpResponse.headers.get('Content-Disposition');
      const result = contentDispositionHeader.split(';')[1].trim().split('=')[1];
      this._name = result.replace(/"/g, '');
  }
}