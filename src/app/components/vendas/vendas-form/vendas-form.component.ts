import { Component,Input,Output,OnInit, input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Router } from '@angular/router';
import { SplitterModule } from 'primeng/splitter';
import { DropdownModule } from 'primeng/dropdown';


import { Venda} from '../venda.type';
import { VendasService } from '../vendas.service';
import { Produto } from '../../produto/produto.type';
import{ Cliente } from '../../Clientes/cliente-taype';



@Component({
  selector: 'app-vendas-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
     FloatLabelModule, SplitterModule,DropdownModule],
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

  constructor(
 private routes: Router,
 private formBuilder: FormBuilder,
 private vendasService: VendasService

){}

ngOnInit(): void {

  this.criarFormulario();
}


criarFormulario(){
  this.form = this.formBuilder.group({
    codigo:[this.venda?this.venda.codigo:""],
    UnidadeDaVenda:[this.venda?this.venda.UnidadeDaVenda:""],
    totalDaVenda:[this.venda?this.venda.totalDaVenda:""],
    produtos:[this.venda?this.venda.produtos:""],
    clientes:[this.venda?this.venda.clientes:""]

})

}
enviar(){}

cancelar(){}
}
