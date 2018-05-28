import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { AppComponentBase } from '@shared/app-component-base';
import { MovimentacaoDto, MovimentacaoServiceProxy } from '@shared/service-proxies/movimentacao-proxy';

@Component({
  selector: 'app-edit-movimentacao',
  templateUrl: './edit-movimentacao.component.html',
  styleUrls: ['./edit-movimentacao.component.css']
})
export class EditMovimentacaoComponent extends AppComponentBase {

  @ViewChild('editMovimentacaoModal') modal: ModalDirective;
  @ViewChild('modalContent') modalContent: ElementRef;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;

  movimentacao: MovimentacaoDto = null;

  constructor(
    injector: Injector,
    private _movimentacaoService: MovimentacaoServiceProxy
  ) {
    super(injector);
  }

  show(id: number): void {
    this._movimentacaoService.get(id)
      .subscribe(
        (result) => {
          this.movimentacao = result;
          this.active = true;
          this.modal.show();
        }
      );
  }

  onShown(): void {
    $.AdminBSB.input.activate($(this.modalContent.nativeElement));
  }

  save(): void {
    this.saving = true;
    this._movimentacaoService.update(this.movimentacao)
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
