import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMovimentacaoComponent } from './edit-movimentacao.component';

describe('EditMovimentacaoComponent', () => {
  let component: EditMovimentacaoComponent;
  let fixture: ComponentFixture<EditMovimentacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMovimentacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMovimentacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
