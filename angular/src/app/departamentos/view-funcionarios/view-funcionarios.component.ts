import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { AppComponentBase } from '@shared/app-component-base';
import { DepartamentoServiceProxy } from '@shared/service-proxies/departamento-proxy';
import { PagedRequestDto } from '@shared/paged-listing-component-base';
import { FuncionarioDto, PagedResultDtoOfFuncionarioDto } from '@shared/service-proxies/funcionario-proxy';

@Component({
  selector: 'app-view-funcionarios',
  templateUrl: './view-funcionarios.component.html',
  styleUrls: ['./view-funcionarios.component.css']
})
export class ViewFuncionariosComponent extends AppComponentBase {

  protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    throw new Error("Method not implemented.");
  }
  protected delete(entity: FuncionarioDto): void {
    throw new Error("Method not implemented.");
  }

  @ViewChild('viewFuncionarioModal') modal: ModalDirective;
  @ViewChild('modalContent') modalContent: ElementRef;

  active = false;

  funcionarios: FuncionarioDto[] = [];

  constructor(
    injector: Injector,
    private _departamentoService: DepartamentoServiceProxy
  ) {
    super(injector);
  }

  listByDepartamento(id: number): void {
    this._departamentoService.getFuncionarios(id)
      .subscribe((result: PagedResultDtoOfFuncionarioDto) => {
        this.funcionarios = result.items;
        this.active = true;
        this.modal.show();
      });
  }

  onShown(): void {
    $.AdminBSB.input.activate($(this.modalContent.nativeElement));
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }

}
