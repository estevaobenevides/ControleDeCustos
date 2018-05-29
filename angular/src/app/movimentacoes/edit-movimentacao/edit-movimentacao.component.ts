import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { AppComponentBase } from '@shared/app-component-base';
import { MovimentacaoDto, MovimentacaoServiceProxy } from '@shared/service-proxies/movimentacao-proxy';
import { FuncionarioDto } from '@shared/service-proxies/funcionario-proxy';

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
  funcionarios: FuncionarioDto[] = [];
  funcionarioSelecionado: FuncionarioDto = null;

  constructor(
    injector: Injector,
    private _movimentacaoService: MovimentacaoServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._movimentacaoService.getFuncionarios()
      .subscribe(result => {
        this.funcionarios = result.items
      })
  }

  show(id: number): void {
    this._movimentacaoService.get(id)
      .subscribe(
        (result) => {
          this.movimentacao = result;
          this.funcionarioSelecionado = new FuncionarioDto()
          this.funcionarioSelecionado.id = result.funcionarioId;
          this.funcionarioSelecionado.nome = result.funcionarioNome;
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
    this.movimentacao.funcionarioId = this.funcionarioSelecionado.id;
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
