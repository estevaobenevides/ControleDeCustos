import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDepartamentosComponent } from './view-departamentos.component';

describe('ViewDepartamentosComponent', () => {
  let component: ViewDepartamentosComponent;
  let fixture: ComponentFixture<ViewDepartamentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDepartamentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
