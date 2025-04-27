
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Venda } from '../../venda.type';

@Component({
  selector: 'app-saida-form',
  imports: [ReactiveFormsModule,FloatLabelModule,FormsModule],
  templateUrl: './saida-form.component.html',
  styleUrl: './saida-form.component.scss'
})
export class SaidaFormComponent implements OnInit{
  form!: FormGroup;
  text = "Registar"
  cancel = "Cancelar"
  @Input() venda?: Venda;
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.criarFormulario();
  }


  criarFormulario(): void {
    this.form = this.formBuilder.group({
      quantidade: [this.venda?.quantidade || ""],
      unidadeDacompra: [this.venda?.unidadeDacompra || ""],
      UnidadeDaVenda: [this.venda?.UnidadeDaVenda || ""],
      totalDaVenda: [this.venda?.totalDaVenda || ""] ,
      lucroTransacao: [this.venda?.lucroTransacao || ""],

    });
  }

  enviar(){}
  cancelar(){

this.router.navigate(['home/vendas-create'])
  }
}



