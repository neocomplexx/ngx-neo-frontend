import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxNeoFrontendMatComponent } from './ngx-neo-frontend-mat.component';

describe('NgxNeoFrontendMatComponent', () => {
  let component: NgxNeoFrontendMatComponent;
  let fixture: ComponentFixture<NgxNeoFrontendMatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxNeoFrontendMatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxNeoFrontendMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
