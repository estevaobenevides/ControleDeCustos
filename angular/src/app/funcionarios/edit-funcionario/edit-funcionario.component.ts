import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { AppComponentBase } from '@shared/app-component-base';
import { FuncionarioDto, FuncionarioServiceProxy } from '@shared/service-proxies/funcionario-proxy';

@Component({
  selector: 'app-edit-funcionario',
  templateUrl: './edit-funcionario.component.html',
  styleUrls: ['./edit-funcionario.component.css']
})
export class EditFuncionarioComponent extends AppComponentBase {

  @ViewChild('editFuncionarioModal') modal: ModalDirective;
  @ViewChild('modalContent') modalContent: ElementRef;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;

  funcionario: FuncionarioDto = null;

  constructor(
    injector: Injector,
    private _funcionarioService: FuncionarioServiceProxy
  ) {
    super(injector);
  }

  show(id: number): void {
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
