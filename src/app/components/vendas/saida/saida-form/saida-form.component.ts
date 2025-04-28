import { Produto } from './../../../produto/produto.type';

import { Component, OnInit, Input, Output} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import{MatSelectModule} from '@angular/material/select';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';


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
  @Input() produto?: Produto;
  @Input() saida?: Saida;

  constructor(private formBuilder: FormBuilder, private router: Router,

    private dialogRef: MatDialogRef<SaidaFormComponent>,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.criarFormulario();
    this.listarClientes();


    if (this.produto) {
      this.preencherCamposComProduto(this.produto);
    }
  }


  criarFormulario(): void {
    this.form = this.formBuilder.group({
      quantidade: [this.saida?.quantidade || ""],
      unidadeDacompra: [this.saida?.unidadeDacompra || ""],
      UnidadeDaVenda: [this.saida?.UnidadeDaVenda || ""],
      totalDaVenda: [this.saida?.totalDaVenda || ""] ,
      lucroTransacao: [this.saida?.lucroTransacao || ""],
      cliente: [this.saida?.cliente || ""],
    });
  }
  preencherCamposComProduto(produto: Produto) {
    this.form.patchValue({
      quantidade: produto.quantidade,
      unidadeDacompra: produto.valorDeCompra,
      UnidadeDaVenda: produto.valorDaUnidade
    });
  }



  listarClientes(): void {

    this.clienteService.listarClientes().subscribe((clientes) => {
      this.clientes = clientes;

    });
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

  emitterForm(){
    this.envio.emit(this.form.value);
  }


 cancelar(){

  this.dialogRef.close();
  this.eventCancel.emit(this.router.navigate(['home/vendas-form']));

  }
}



