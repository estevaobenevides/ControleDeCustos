import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { FuncionarioDto, FuncionarioServiceProxy, PagedResultDtoOfFuncionarioDto } from '@shared/service-proxies/funcionario-proxy';
import { CreateFuncionarioComponent } from './create-funcionario/create-funcionario.component';
import { EditFuncionarioComponent } from './edit-funcionario/edit-funcionario.component';
import { ViewDepartamentosComponent } from './view-departamentos/view-departamentos.component';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent extends PagedListingComponentBase<FuncionarioDto>  {

  @ViewChild('createFuncionarioModal') createFuncionarioModal: CreateFuncionarioComponent;
  @ViewChild('editFuncionarioModal') editFuncionarioModal: EditFuncionarioComponent;
  @ViewChild('viewDepartamentoModal') viewDepartamentoModal: ViewDepartamentosComponent;

  active = false;
  funcionarios: FuncionarioDto[] = [];

  constructor(
    injector: Injector,
    private _funcionarioService: FuncionarioServiceProxy
  ) {
    super(injector);
  }

  protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this._funcionarioService.getAll(request.skipCount, request.maxResultCount)
      .finally(() => {
        finishedCallback();
      })
      .subscribe((result: PagedResultDtoOfFuncionarioDto) => {
        this.funcionarios = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(funcionario: FuncionarioDto): void {
    abp.message.confirm(
      `Deletar funcionário ${funcionario.nome}?`,
      (result: boolean) => {
        if (result) {
          this._funcionarioService.delete(funcionario.id)
            .subscribe(() => {
              abp.notify.info(`Funcionário ${funcionario.nome} deletado`);
              this.refresh();
            });
        }
      }
    );
  }

  // Show Modals
  createFuncionario(): void {
    this.createFuncionarioModal.show();
  }

  editFuncionario(funcionario: FuncionarioDto): void {
    this.editFuncionarioModal.show(funcionario.id);
  }

  viewDepartamentos(funcionario: FuncionarioDto): void {
    this.viewDepartamentoModal.listByFuncionario(funcionario.id);
  }

} 
