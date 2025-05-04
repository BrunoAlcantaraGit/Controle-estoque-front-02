import { Produto } from './../../../produto/produto.type';

import { Component, OnInit, Input, Output} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule,Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import{MatSelectModule} from '@angular/material/select';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

import { Cliente } from '../../../Clientes/cliente-taype';
import { ClienteService } from '../../../Clientes/cliente.service';
import { Saida } from '../saida.type';
import { max } from 'rxjs';




@Component({
  selector: 'app-saida-form',
  imports: [ReactiveFormsModule,FloatLabelModule,FormsModule,MatSelectModule,CommonModule],
  templateUrl: './saida-form.component.html',
  styleUrl: './saida-form.component.scss'
})
export class SaidaFormComponent implements OnInit{
  form!: FormGroup;
  text = "Registar Saida"
  cancel = "Cancelar"

  @Output() envio = new EventEmitter()
  @Output() eventCancel = new EventEmitter()
  @Input() clientes?: Cliente[];
  produto?: Produto[];
  @Input() saida?: Saida;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<SaidaFormComponent>,
    private clienteService: ClienteService,
    @Inject(MAT_DIALOG_DATA) public produtoSelecionado: Produto
  ) {}

  ngOnInit(): void {
    this.criarFormulario();
    this.listarClientes();

    this.form.valueChanges.subscribe(val => {
      const quantidade = Number(val.quantidade);
      const venda = Number(val.venda);
      const compra = Number(val.compra);

      if (!isNaN(quantidade) && !isNaN(compra)) {
        const totalDaVenda = quantidade * compra;
        this.form.get('totalDaVenda')?.setValue(totalDaVenda, {emitEvent: false });
      }

      if (!isNaN(quantidade) && !isNaN(venda) && !isNaN(venda)) {
        const lucro = (venda - compra) * quantidade;
        this.form.get('lucroTransacao')?.setValue(lucro, { emitEvent: false });
      }
    });



    if (this.produtoSelecionado) {
      this.form.patchValue({
        produto: this.produtoSelecionado.id,
        quantidade: this.produtoSelecionado.quantidade,
        venda: this.produtoSelecionado.venda,
        compra: this.produtoSelecionado.compra,
      });

      this.marcarCamposComoTocados(this.form);
    }


  }

  criarFormulario(): void {
    this.form = this.formBuilder.group({
      quantidade: [this.saida?.quantidade || '',Validators.required],
      venda: [this.saida?.venda || '', Validators.required],
      compra: [this.saida?.compra || '', Validators.required],
      totalDaVenda: [this.saida?.totalDaVenda || '',  Validators.required],
      lucroTransacao: [ this.saida?.lucroTransacao || '' ,Validators.required],
      cliente: [this.saida?.cliente || '', Validators.required],
      produto: [this.saida?.produto || '', Validators.required]
    });
  }

  emitterForm(){
    console.log(this.form.value,);
    this.envio.emit(this.form.value);
  }


  marcarCamposComoTocados(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);

      if (controle instanceof FormGroup) {
        this.marcarCamposComoTocados(controle);
      } else {
        controle?.markAsTouched();
        controle?.markAsDirty();
        controle?.updateValueAndValidity();
      }
    });
  }



  listarClientes(): void {

     this.clienteService.listarClientes().subscribe((clientes) => {
      this.clientes = clientes;

    });
  }



 cancelar(){

  this.dialogRef.close();
  this.eventCancel.emit(this.router.navigate(['home/vendas-form']));

  }
}



