import { Component, ViewChild, ViewChildren, Injector, Output, EventEmitter, ElementRef, QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { AppComponentBase } from '@shared/app-component-base';
import { FuncionarioDto, FuncionarioServiceProxy } from '@shared/service-proxies/funcionario-proxy';
import { DepartamentoDto } from '@shared/service-proxies/departamento-proxy';

@Component({
  selector: 'app-edit-funcionario',
  templateUrl: './edit-funcionario.component.html',
  styleUrls: ['./edit-funcionario.component.css']
})
export class EditFuncionarioComponent extends AppComponentBase {

  @ViewChild('editFuncionarioModal') modal: ModalDirective;
  @ViewChild('modalContent') modalContent: ElementRef;
  @ViewChildren('inputDepartamentos') inputDepartamentos: QueryList<ElementRef>;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;

  funcionario: FuncionarioDto = null;
  departamentos: DepartamentoDto[] = null;

  constructor(
    injector: Injector,
    private _funcionarioService: FuncionarioServiceProxy
  ) {
    super(injector);
  }

  funcionarioInDepartamento(funcionario: FuncionarioDto, departamento: DepartamentoDto): string {
    if (funcionario.departamentoIds && funcionario.departamentoIds.indexOf(departamento.id) !== -1) {
      return 'checked';
    } else {
      return '';
    }
  }

  show(id: number): void {
    this._funcionarioService.getDepartamentos()
      .subscribe((result) => {
        this.departamentos = result.items;
      });

    this._funcionarioService.get(id)
      .subscribe(
        (result) => {
          this.funcionario = result;
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
    const departamentos = [];
    this.inputDepartamentos.forEach(
      (departamento) =>
        departamentos.push(parseInt(departamento.nativeElement.getAttribute('value'), 0))
    );
    if (departamentos.length === 0) {
      this.notify.info('Selecione pelo menos um departamento.');
      return;
    }
    this.funcionario.departamentoIds = departamentos;
    this._funcionarioService.update(this.funcionario)
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
