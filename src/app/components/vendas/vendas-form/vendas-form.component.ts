import { Component,Input,Output,OnInit, input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Router } from '@angular/router';
import { SplitterModule } from 'primeng/splitter';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { ClienteService } from '../../Clientes/cliente.service';
import { Venda} from '../venda.type';
import { VendasService } from '../vendas.service';
import { Produto } from '../../produto/produto.type';
import{ Cliente } from '../../Clientes/cliente-taype';



@Component({
  selector: 'app-vendas-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
     FloatLabelModule, SplitterModule,DropdownModule,AutoCompleteModule],
  templateUrl: './vendas-form.component.html',
  styleUrl: './vendas-form.component.scss'
})
export class VendasFormComponent implements OnInit {

  @Input() text = "Salvar"
  @Input() cancel = "Cancelar"
  form!:FormGroup
  @Output() envio = new EventEmitter()
  @Input() venda?: Venda

  @Input() produtos?:Produto[]

  @Input() clientes?:Cliente[]
  clientesFiltrados: Cliente[] = [];

  constructor(
 private routes: Router,
 private formBuilder: FormBuilder,
 private vendasService: VendasService,
 private clienteService: ClienteService

){}

ngOnInit(): void {
  this.criarFormulario();
  this.listarClientes();
  this.listarProduto();
  if (this.venda) {
    this.form.patchValue(this.venda);
    this.marcarCamposComoTocados(this.form);
  }
}

selecionarCliente(cliente: Cliente) {
  this.form.patchValue({
    clienteInput: cliente.nome,
    cliente: cliente.id // ou o objeto todo, se preferir
  });
  this.clientesFiltrados = []; // esconde lista
}
filtrarClientes() {
  const input = this.form.get('clienteInput')?.value?.toLowerCase() || '';
  this.clientesFiltrados = (this.clientes || []).filter(cliente =>
    cliente.nome.toLowerCase().includes(input) ||
    cliente.documento.toLowerCase().includes(input)
  );
}

criarFormulario(){
  this.form = this.formBuilder.group({
    codigo:[this.venda?this.venda.codigo:""],
    UnidadeDaVenda:[this.venda?this.venda.UnidadeDaVenda:""],
    totalDaVenda:[this.venda?this.venda.totalDaVenda:""],
    produtos:[this.venda?this.venda.produtos:""],
    cliente: [this.venda ? this.venda.cliente?.id : null]

})

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

listarClientes(){
this.clienteService.listarClientes().subscribe(clientes => this.clientes = clientes);
}

listarProduto(){}

enviar(){}

cancelar(){}
}
