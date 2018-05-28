import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';
import { CreateFuncionarioDto, FuncionarioServiceProxy } from '@shared/service-proxies/funcionario-proxy';

@Component({
  selector: 'app-create-funcionario',
  templateUrl: './create-funcionario.component.html',
  styleUrls: ['./create-funcionario.component.css']
})
export class CreateFuncionarioComponent extends AppComponentBase implements OnInit {

  @ViewChild('createFuncionarioModal') modal: ModalDirective;
  @ViewChild('modalContent') modalContent: ElementRef;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;
  funcionario: CreateFuncionarioDto = null;

  constructor(
    injector: Injector,
    private _funcionarioService: FuncionarioServiceProxy,
  ) {
    super(injector);
  }

  ngOnInit(): void {
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
