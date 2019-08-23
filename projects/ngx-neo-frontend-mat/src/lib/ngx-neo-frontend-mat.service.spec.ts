import { TestBed } from '@angular/core/testing';

import { NgxNeoFrontendMatService } from './ngx-neo-frontend-mat.service';

describe('NgxNeoFrontendMatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxNeoFrontendMatService = TestBed.get(NgxNeoFrontendMatService);
    expect(service).toBeTruthy();
  });
});
