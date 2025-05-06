import { Component, Input, Output, EventEmitter, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';


import { FloatLabelModule } from 'primeng/floatlabel';
import { SplitterModule } from 'primeng/splitter';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import{MatSelectModule} from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject,Optional } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'




import { Produto } from '../../produto/produto.type';
import { SaidaReadComponent } from "../saida/saida-read/saida-read.component";
import { SaidaFormComponent } from '../saida/saida-form/saida-form.component';
import { VendasReadComponent } from "../vendas-read/vendas-read.component";
import { RegistroDeSaidasReadComponent } from "../registro-de-saidas-read/registro-de-saidas-read.component";

@Component({
  selector: 'app-vendas-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FloatLabelModule,
    SplitterModule,
    DropdownModule,
    AutoCompleteModule,
    MatSelectModule,
    SaidaReadComponent,
    RegistroDeSaidasReadComponent
],
  templateUrl: './vendas-form.component.html',
  styleUrls: ['./vendas-form.component.scss']
})
export class VendasFormComponent implements OnInit {

  @Input() text = "Salvar";
  @Input() cancel = "Cancelar";
  @Input() produtos?: Produto[];


  @Output() envio = new EventEmitter();
  form!: FormGroup;
  filterCliente: string = '';
  formData!: FormData
  produto!: Produto
  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any = null,
    @Optional() private dialogRef?: MatDialogRef<VendasFormComponent>,

  ) {}

  ngOnInit(): void {

    this.criarFormulario();

    if (this.data) {
      this.produto = this.data;
    }

  }


criarFormulario(): void {}

openSaidaForm(produto: Produto) {
  const dialogRef = this.dialog.open(SaidaFormComponent, {
    data: produto
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Saída registrada', result);

    }
  });
}


  enviar(): void {

  }

  cancelar(){

  }

}
