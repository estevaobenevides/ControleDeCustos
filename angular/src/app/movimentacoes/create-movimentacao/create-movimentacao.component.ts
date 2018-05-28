import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';
import { CreateMovimentacaoDto, MovimentacaoServiceProxy } from '@shared/service-proxies/movimentacao-proxy';

@Component({
  selector: 'app-create-movimentacao',
  templateUrl: './create-movimentacao.component.html',
  styleUrls: ['./create-movimentacao.component.css']
})
export class CreateMovimentacaoComponent extends AppComponentBase implements OnInit {

  @ViewChild('createMovimentacaoModal') modal: ModalDirective;
  @ViewChild('modalContent') modalContent: ElementRef;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;
  movimentacao: CreateMovimentacaoDto = null;

  constructor(
    injector: Injector,
    private _movimentacaoService: MovimentacaoServiceProxy,
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }

  show(): void {
    this.active = true;
    this.modal.show();
    this.movimentacao = new CreateMovimentacaoDto();
  }

  onShown(): void {
    $.AdminBSB.input.activate($(this.modalContent.nativeElement));
  }

  save(): void {
    this.saving = true;
    this._movimentacaoService.create(this.movimentacao)
      .finally(() => { this.saving = false; })
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.close();
        this.modalSave.emit(null);
      });
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }

}
