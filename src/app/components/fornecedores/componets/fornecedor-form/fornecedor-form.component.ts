import { Component, EventEmitter, Output } from '@angular/core';
import { Fornecedor, Contato, Endereco } from '../../fornecedor.type'; // Adapte o caminho conforme necessário
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule para usar ngModel
import { FloatLabelModule } from 'primeng/floatlabel';
import { Router } from '@angular/router';
import { SplitterModule } from 'primeng/splitter';



@Component({
  selector: 'app-fornecedor-form',
  imports: [CommonModule, FormsModule, FloatLabelModule,SplitterModule],
  templateUrl: './fornecedor-form.component.html',
  styleUrl: './fornecedor-form.component.scss'
})
export class FornecedorFormComponent {
  @Output() envio = new EventEmitter<Fornecedor>();

  constructor(
    private router: Router
  ) {}

  fornecedor: Fornecedor = {
    id: 0,
    nome: '',
    documento: '',
    contato: {
      id: 0,
      telefone: '',
      email: ''
    },
    endereco: {
      id: 0,
      logradouro: '',
      numero: '',
      bairro: '',
      cep: '',
      estado: '',
      complemento: ''
    }
  };



  // Método para enviar os dados do formulário
  onSubmit() {
    this.envio.emit(this.fornecedor);
    console.log(this.fornecedor);
  }


  cancelar(){
    this.router.navigate(['home/saidas']);
  }

}


