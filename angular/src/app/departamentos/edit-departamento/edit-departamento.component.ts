import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { AppComponentBase } from '@shared/app-component-base';
import { DepartamentoDto, DepartamentoServiceProxy } from '@shared/service-proxies/departamento-proxy';

@Component({
  selector: 'app-edit-departamento',
  templateUrl: './edit-departamento.component.html',
  styleUrls: ['./edit-departamento.component.css']
})
export class EditDepartamentoComponent extends AppComponentBase {

  @ViewChild('editDepartamentoModal') modal: ModalDirective;
  @ViewChild('modalContent') modalContent: ElementRef;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;

  departamento: DepartamentoDto = null;

  constructor(
    injector: Injector,
    private _departamentoService: DepartamentoServiceProxy
  ) {
    super(injector);
  }

  show(id: number): void {
    this._departamentoService.get(id)
      .subscribe(
        (result) => {
          this.departamento = result;
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
    this._departamentoService.update(this.departamento)
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
