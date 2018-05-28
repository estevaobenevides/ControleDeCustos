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

  show(id: number): void {
    this._departamentoService.getFuncionarios(id)
      .subscribe((result: FuncionarioDto[]) => {
        this.funcionarios = result;
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
