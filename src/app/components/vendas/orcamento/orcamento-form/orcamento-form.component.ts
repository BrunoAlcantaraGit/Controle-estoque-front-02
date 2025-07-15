import { NgModule } from '@angular/core';
import { Produto } from '../../../produto/produto.type';

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
import { ToastrService } from 'ngx-toastr';

import { Cliente } from '../../../Clientes/cliente-taype';
import { ClienteService } from '../../../Clientes/cliente.service';
import { Orcamento } from '../orcamento.type';


import { ProdutoService } from '../../../produto/produto.service';
import { OrcamentoService } from './../orcamento.service';



@Component({
  selector: 'app-orcamento-form',
  imports: [ReactiveFormsModule,FloatLabelModule,FormsModule,MatSelectModule,CommonModule],
  templateUrl: './orcamento-form.component.html',
  styleUrl: './orcamento-form.component.scss'
})
export class OrcamentoFormComponent implements OnInit{
  form!: FormGroup;
  text = "Registar Orcamento"
  cancel = "Cancelar"

  @Output() eventCancel = new EventEmitter()
  @Input() clientes?: Cliente[];
  produto?: Produto
  @Input() orcamento?: Orcamento;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<OrcamentoFormComponent>,
    private clienteService: ClienteService,
    private produtoService: ProdutoService,
    private orcamentoService: OrcamentoService,
    private toastrService: ToastrService,
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

       this.produto = this.produtoSelecionado;

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
      quantidade: [this.orcamento?.quantidade || '',Validators.required],
      venda: [this.orcamento?.venda || '', Validators.required],
      compra: [this.orcamento?.compra || '', Validators.required],
      totalDaVenda: [this.orcamento?.totalDaVenda || '',  Validators.required],
      lucroTransacao: [ this.orcamento?.lucroTransacao || '' ,Validators.required],
      cliente: [this.orcamento?.cliente || '', Validators.required],
      produto: [this.orcamento?.produtos || '', Validators.required]
    });
  }



    registrarOcamento(orcamento: Orcamento) {
      
      if (!this.produto?.id) return;

        const quantidadeAtual = this.produto.quantidade;

        if (quantidadeAtual >= orcamento.quantidade && orcamento.quantidade > 0) {
          const novaQuantidade = quantidadeAtual - orcamento.quantidade;
          const produtoAtualizado = { ...this.produto, quantidade: novaQuantidade };
          const formData = new FormData();
          formData.append('quantidade', produtoAtualizado.quantidade.toString());
          formData.append('descricao', produtoAtualizado.descricao);
          formData.append('marca', produtoAtualizado.marca);
          formData.append('codigo', produtoAtualizado.codigo);
          formData.append('venda', produtoAtualizado.venda.toString());
          formData.append('compra', produtoAtualizado.compra.toString());
          formData.append('imagem', produtoAtualizado.imagem);


          this.produtoService.editarProduto(this.produto.id, formData).subscribe(() => {

            this.toastrService.success('Orcamento registrado com sucesso!', 'Sucesso');

            this.orcamentoService.salvar(orcamento).subscribe(() => {

              this.dialogRef.close();
              this.router.navigate(['home/orcamento']);
            });
          });

        } else {
          this.toastrService.error('Quantidade insuficiente em estoque', 'Erro');
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



