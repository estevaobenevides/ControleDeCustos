import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFuncionariosComponent } from './view-funcionarios.component';

describe('ViewFuncionariosComponent', () => {
  let component: ViewFuncionariosComponent;
  let fixture: ComponentFixture<ViewFuncionariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFuncionariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
