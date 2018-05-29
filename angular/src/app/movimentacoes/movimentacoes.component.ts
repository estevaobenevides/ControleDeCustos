import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { MovimentacaoDto, MovimentacaoServiceProxy, PagedResultDtoOfMovimentacaoDto } from '@shared/service-proxies/movimentacao-proxy';
import { EditMovimentacaoComponent } from './edit-movimentacao/edit-movimentacao.component';
import { CreateMovimentacaoComponent } from './create-movimentacao/create-movimentacao.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
  selector: 'app-movimentacoes',
  templateUrl: './movimentacoes.component.html',
  styleUrls: ['./movimentacoes.component.css'],
  animations: [appModuleAnimation()]
})
export class MovimentacoesComponent extends PagedListingComponentBase<MovimentacaoDto> {

  @ViewChild('createMovimentacaoModal') createMovimentacaoModal: CreateMovimentacaoComponent;
  @ViewChild('editMovimentacaoModal') editMovimentacaoModal: EditMovimentacaoComponent;

  active = false;
  movimentacoes: MovimentacaoDto[] = [];

  constructor(
    injector: Injector,
    private _movimentacaoService: MovimentacaoServiceProxy
  ) {
    super(injector);
  }

  protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this._movimentacaoService.getAll(request.skipCount, request.maxResultCount)
      .finally(() => {
        finishedCallback();
      })
      .subscribe((result: PagedResultDtoOfMovimentacaoDto) => {
        this.movimentacoes = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(movimentacao: MovimentacaoDto): void {
    abp.message.confirm(
      `Deletar ${movimentacao.descricao}?`,
      (result: boolean) => {
        if (result) {
          this._movimentacaoService.delete(movimentacao.id)
            .subscribe(() => {
              abp.notify.info(`Movimentação ${movimentacao.descricao} deletada`);
              this.refresh();
            });
        }
      }
    );
  }

  // Show Modals
  createMovimentacao(): void {
    this.createMovimentacaoModal.show();
  }

  editMovimentacao(movimentacao: MovimentacaoDto): void {
    this.editMovimentacaoModal.show(movimentacao.id);
  }

}
