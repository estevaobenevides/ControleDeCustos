import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { DepartamentoDto, PagedResultDtoOfDepartamentoDto, DepartamentoServiceProxy } from '@shared/service-proxies/departamento-proxy';
import { CreateDepartamentoComponent } from './create-departamento/create-departamento.component';
import { EditDepartamentoComponent } from './edit-departamento/edit-departamento.component';
import { ViewFuncionariosComponent } from './view-funcionarios/view-funcionarios.component';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css'],
  animations: [appModuleAnimation()]
})
export class DepartamentosComponent extends PagedListingComponentBase<DepartamentoDto> {

  @ViewChild('createDepartamentoModal') createDepartamentoModal: CreateDepartamentoComponent;
  @ViewChild('editDepartamentoModal') editDepartamentoModal: EditDepartamentoComponent;
  @ViewChild('viewFuncionarioDepartamentoModal') viewFuncionarioDepartamentoModal: ViewFuncionariosComponent;

  active = false;
  departamentos: DepartamentoDto[] = [];

  constructor(
    injector: Injector,
    private _departamentoService: DepartamentoServiceProxy
  ) {
    super(injector);
  }

  protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this._departamentoService.getAll(request.skipCount, request.maxResultCount)
      .finally(() => {
        finishedCallback();
      })
      .subscribe((result: PagedResultDtoOfDepartamentoDto) => {
        this.departamentos = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(departamento: DepartamentoDto): void {
    abp.message.confirm(
      `Deletar departamento ${departamento.nome}?`,
      (result: boolean) => {
        if (result) {
          this._departamentoService.delete(departamento.id)
            .subscribe(() => {
              abp.notify.info(`Departamento ${departamento.nome} deletado`);
              this.refresh();
            });
        }
      }
    );
  }

  // Show Modals
  createDepartamento(): void {
    this.createDepartamentoModal.show();
  }

  editDepartamento(departamento: DepartamentoDto): void {
    this.editDepartamentoModal.show(departamento.id);
  }

  viewFuncionarios(departamento: DepartamentoDto): void {
    this.viewFuncionarioDepartamentoModal.show(departamento.id);
  }

}
