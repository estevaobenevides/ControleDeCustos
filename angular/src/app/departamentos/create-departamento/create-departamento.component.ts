import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';
import { DepartamentoServiceProxy, CreateDepartamentoDto } from '@shared/service-proxies/departamento-proxy';

@Component({
  selector: 'app-create-departamento',
  templateUrl: './create-departamento.component.html',
  styleUrls: ['./create-departamento.component.css']
})
export class CreateDepartamentoComponent extends AppComponentBase implements OnInit {

  @ViewChild('createDepartamentoModal') modal: ModalDirective;
  @ViewChild('modalContent') modalContent: ElementRef;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;
  departamento: CreateDepartamentoDto = null;

  constructor(
    injector: Injector,
    private _departamentoService: DepartamentoServiceProxy,
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }

  show(): void {
    this.active = true;
    this.modal.show();
    this.departamento = new CreateDepartamentoDto();
  }

  onShown(): void {
    $.AdminBSB.input.activate($(this.modalContent.nativeElement));
  }

  save(): void {
    this.saving = true;
    this._departamentoService.create(this.departamento)
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
