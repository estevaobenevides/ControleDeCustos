import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMovimentacaoComponent } from './create-movimentacao.component';

describe('CreateMovimentacaoComponent', () => {
  let component: CreateMovimentacaoComponent;
  let fixture: ComponentFixture<CreateMovimentacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMovimentacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMovimentacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
