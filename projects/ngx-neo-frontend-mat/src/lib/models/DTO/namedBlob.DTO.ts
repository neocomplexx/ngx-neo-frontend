import { HttpResponse } from '@angular/common/http';

export class NamedBlobDTO {

    public blob: Blob;
    public name: string;

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
        if (this.name) {
            return  this.name.split('.').pop();
        } else {
            return null;
        }
    }

    public setBlobNameFromHttpResponse(httpResponse: HttpResponse<Blob>): void {
      const contentDispositionHeader = httpResponse.headers.get('Content-Disposition');
      const result = contentDispositionHeader.split(';')[1].trim().split('=')[1];
      this.name = result.replace(/"/g, '');
  }
}