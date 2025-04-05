import { Component, EventEmitter, Output,OnInit, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Router } from '@angular/router';
import { SplitterModule } from 'primeng/splitter';
import{FormBuilder,FormGroup,Validators,ReactiveFormsModule} from '@angular/forms';

import { FornecedorServiceService } from '../../fornecedor-service.service';
import { Fornecedor } from '../../fornecedor.type';




@Component({
  selector: 'app-fornecedor-form',
  imports: [CommonModule, FormsModule, FloatLabelModule,SplitterModule,ReactiveFormsModule,],
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
    private fornecedorService:FornecedorServiceService
  ) {}

ngOnInit(): void {
  this.criandoForm()
  this.changeFormeValue()
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
  });}

  changeFormeValue(): void {
    this.form.get('endereco.cep')?.valueChanges.subscribe((cep) => {
      this.fornecedorService.buscarEndereco(cep).subscribe((endereco) => {
        setTimeout(() => {//serve para gerar um delay para o endereço ser carregado
          this.form.patchValue({
            endereco: {
              logradouro: endereco.logradouro || '',
              bairro: endereco.bairro || '',
              estado: endereco.estado || '',
            }
          });

          const enderecoGroup = this.form.get('endereco');
          if (enderecoGroup) {
            ['logradouro', 'bairro', 'estado'].forEach((campo) => {
              const control = enderecoGroup.get(campo);
              if (control) {
                control.markAsDirty();
                control.markAsTouched();
                control.updateValueAndValidity({ onlySelf: true, emitEvent: true });
              }
            });
          }
        }, 0);
      });
    });
  }

  enviar(){

    this.envio.emit(this.form.value);
  }


  cancelar(){
    this.router.navigate(['home/saidas']);
  }

}


