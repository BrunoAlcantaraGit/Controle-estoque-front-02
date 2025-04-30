import { Produto } from './../../../produto/produto.type';

import { Component, OnInit, Input, Output} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { Saida } from '../../saida.type';




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

    if (this.produtoSelecionado) {
      this.form.patchValue({
        quantidade: this.produtoSelecionado.quantidade,
        venda: this.produtoSelecionado.venda,
        compra: this.produtoSelecionado.compra,
      });

      this.marcarCamposComoTocados(this.form);
    }


  }


  criarFormulario(): void {
    this.form = this.formBuilder.group({
      quantidade: [this.saida?.quantidade || ""],
      venda: [this.saida?.venda || ""],
      compra: [this.saida?.compra || ""],
      totalDaVenda: [this.saida?.totalDaVenda || ""] ,
      lucroTransacao: [this.saida?.lucroTransacao || ""],
      cliente: [this.saida?.cliente || ""],
    });
  }

  changeValueProdutoForm():void{
    const produtoId = this.form.get('produto')?.value;
    const produtoSelecionado = this.produto?.find(produto => produto.id === produtoId);
    if(produtoSelecionado){
      this.form.patchValue({
        quantidade: produtoSelecionado.quantidade,
        venda:produtoSelecionado.venda,
        compra:produtoSelecionado.compra
      })

    }
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

  atribuirEventos():void{

  }

  listarClientes(): void {

    this.clienteService.listarClientes().subscribe((clientes) => {
      this.clientes = clientes;

    });
  }


  emitterForm(){
    this.envio.emit(this.form.value);
  }


 cancelar(){

  this.dialogRef.close();
  this.eventCancel.emit(this.router.navigate(['home/vendas-form']));

  }
}



