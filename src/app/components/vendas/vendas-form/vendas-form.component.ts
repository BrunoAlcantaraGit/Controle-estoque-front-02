import { Component, Input, Output, EventEmitter, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { FloatLabelModule } from 'primeng/floatlabel';
import { SplitterModule } from 'primeng/splitter';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import{MatSelectModule} from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject,Optional } from '@angular/core';

import { ClienteService } from '../../Clientes/cliente.service';
import { VendasService } from '../vendas.service';

import { Venda } from '../venda.type';
import { Produto } from '../../produto/produto.type';
import { Cliente } from '../../Clientes/cliente-taype';
import { SaidaReadComponent } from "../saida/saida-read/saida-read.component";

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
],
  templateUrl: './vendas-form.component.html',
  styleUrls: ['./vendas-form.component.scss']
})
export class VendasFormComponent implements OnInit {

  @Input() text = "Salvar";
  @Input() cancel = "Cancelar";
  @Input() venda?: Venda;
  @Input() produtos?: Produto[];
  @Input() clientes?: Cliente[];
  clientesFiltrados?: Cliente[] = [];

  @Output() envio = new EventEmitter();
  form!: FormGroup;
  filterCliente: string = '';

  formData!: FormData
  produto!: Produto
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private vendasService: VendasService,
    private clienteService: ClienteService,

    @Optional() @Inject(MAT_DIALOG_DATA) public data: any = null,
    @Optional() private dialogRef?: MatDialogRef<VendasFormComponent>,
  ) {}

  ngOnInit(): void {

    if (this.data) {
      this.produto = this.data;
    }

    this.criarFormulario();
    this.listarClientes();


    if (this.venda) {
      this.form.patchValue(this.venda);
      this.marcarCamposComoTocados(this.form);
    }
  }

  criarFormulario(): void {
    this.form = this.formBuilder.group({
      quantidade: [this.venda?.quantidade || ""],
      unidadeDacompra: [this.venda?.unidadeDacompra || ""],
      UnidadeDaVenda: [this.venda?.UnidadeDaVenda || ""],
      totalDaVenda: [this.venda?.totalDaVenda || ""] ,
      lucroTransacao: [this.venda?.lucroTransacao || ""],
      produtos: [this.venda?.produtos || ""],
      cliente: [this.venda?.cliente?.id || null],
      clienteInput: [this.venda?.cliente?.nome || ""]
    });
  }

  listarClientes(): void {

    this.clienteService.listarClientes().subscribe((clientes) => {
      this.clientes = clientes;
      this.clientesFiltrados = clientes;
    });
  }



  marcarCamposComoTocados(formGroup: FormGroup): void {
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


  filtrarClientes(): void {
    const filtro = this.filterCliente.toLowerCase();
    this.clientesFiltrados = this.clientes?.filter(cliente =>
      cliente.nome.toLowerCase().includes(filtro) ||
      cliente.documento.toLowerCase().includes(filtro)
    );
  }

  enviar(): void {

  }

  cancelar(): void {

  }
}
