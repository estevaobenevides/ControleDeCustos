import { Component, OnInit, ViewChild, ViewChildren, Output, EventEmitter, ElementRef, Injector, QueryList } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';
import { CreateFuncionarioDto, FuncionarioServiceProxy } from '@shared/service-proxies/funcionario-proxy';
import { DepartamentoDto } from '@shared/service-proxies/departamento-proxy';

@Component({
  selector: 'app-create-funcionario',
  templateUrl: './create-funcionario.component.html',
  styleUrls: ['./create-funcionario.component.css']
})
export class CreateFuncionarioComponent extends AppComponentBase implements OnInit {

  @ViewChild('createFuncionarioModal') modal: ModalDirective;
  @ViewChild('modalContent') modalContent: ElementRef;
  @ViewChildren('inputDepartamentos') inputDepartamentos: QueryList<ElementRef>;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;
  funcionario: CreateFuncionarioDto = null;
  departamentos: DepartamentoDto[] = null;

  constructor(
    injector: Injector,
    private _funcionarioService: FuncionarioServiceProxy,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._funcionarioService.getDepartamentos()
      .subscribe((result) => {
        this.departamentos = result.items;
      });
  }

  show(): void {
    this.active = true;
    this.modal.show();
    this.funcionario = new CreateFuncionarioDto();
  }

  onShown(): void {
    $.AdminBSB.input.activate($(this.modalContent.nativeElement));
  }

  save(): void {
    this.saving = true;
    const departamentos = [];
    this.inputDepartamentos.forEach(
      (departamento) =>
        departamentos.push(parseInt(departamento.nativeElement.getAttribute('value'), 0))
    )
    if (departamentos.length === 0) {
      this.notify.warn('Selecione pelo menos um departamento.');
      return;
    }
    this.funcionario.departamentoIds = departamentos;
    this._funcionarioService.create(this.funcionario)
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
