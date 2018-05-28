import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { AppComponentBase } from '@shared/app-component-base';
import { PagedRequestDto } from '@shared/paged-listing-component-base';
import { FuncionarioServiceProxy } from '@shared/service-proxies/funcionario-proxy';
import { DepartamentoDto, PagedResultDtoOfDepartamentoDto } from '@shared/service-proxies/departamento-proxy';

@Component({
  selector: 'app-view-departamentos',
  templateUrl: './view-departamentos.component.html',
  styleUrls: ['./view-departamentos.component.css']
})
export class ViewDepartamentosComponent extends AppComponentBase {

  protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    throw new Error("Method not implemented.");
  }
  protected delete(entity: DepartamentoDto): void {
    throw new Error("Method not implemented.");
  }

  @ViewChild('viewDepartamentoModal') modal: ModalDirective;
  @ViewChild('modalContent') modalContent: ElementRef;

  active = false;

  departamentos: DepartamentoDto[] = [];

  constructor(
    injector: Injector,
    private _funcionarioService: FuncionarioServiceProxy
  ) {
    super(injector);
  }

  listByDepartamento(id: number): void {
    this._funcionarioService.getDepartamentosById(id)
      .subscribe((result: PagedResultDtoOfDepartamentoDto) => {
        this.departamentos = result.items;
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
