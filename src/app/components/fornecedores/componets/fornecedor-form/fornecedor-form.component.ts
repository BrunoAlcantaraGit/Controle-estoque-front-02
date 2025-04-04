
import { Component, EventEmitter, Output,OnInit, Input } from '@angular/core';
import { Fornecedor, Contato, Endereco } from '../../fornecedor.type'; // Adapte o caminho conforme necessário
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule para usar ngModel
import { FloatLabelModule } from 'primeng/floatlabel';
import { Router } from '@angular/router';
import { SplitterModule } from 'primeng/splitter';
import{FormBuilder,FormGroup,Validators,ReactiveFormsModule,NgForm,FormControl,FormGroupDirective} from '@angular/forms';




@Component({
  selector: 'app-fornecedor-form',
  imports: [CommonModule, FormsModule, FloatLabelModule,SplitterModule,ReactiveFormsModule],
  standalone: true,
  templateUrl: './fornecedor-form.component.html',
  styleUrl: './fornecedor-form.component.scss'
})
export class FornecedorFormComponent implements OnInit {
  @Output() envio = new EventEmitter<Fornecedor>();
  @Input()fornecedor!:Fornecedor
  form!:FormGroup


  constructor(
    private router: Router,
    private formBuilder:FormBuilder,
  ) {}

ngOnInit(): void {
  this.criandoForm()
}



criandoForm(){
  this.form = this.formBuilder.group({
    nome: this.fornecedor ? this.fornecedor.nome : [''],
    documento: this.fornecedor ? this.fornecedor.documento : [''],

    contato: this.formBuilder.group({
      telefone: this.fornecedor? this.fornecedor.contato.telefone: [''],
      email: this.fornecedor? this.fornecedor.contato.email: [''],
    }),
    endereco: this.formBuilder.group({
      cep:this.fornecedor? this.fornecedor.endereco.cep: [''],
      logradouro: this.fornecedor? this.fornecedor.endereco.logradouro: [''],
      numero: this.fornecedor? this.fornecedor.endereco.numero: [''],
      bairro: this.fornecedor? this.fornecedor.endereco.bairro: [''],
      estado: this.fornecedor? this.fornecedor.endereco.estado: [''],
      complemento: this.fornecedor? this.fornecedor.endereco.complemento: [''],
    }),
  });


}

  enviar(){

    this.envio.emit(this.form.value);
  }


  cancelar(){
    this.router.navigate(['home/saidas']);
  }

}


