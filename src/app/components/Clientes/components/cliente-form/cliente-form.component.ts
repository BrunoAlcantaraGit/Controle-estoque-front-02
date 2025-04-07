import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Router } from '@angular/router';
import { SplitterModule } from 'primeng/splitter';

import { ClienteService } from '../../cliente.service';
import { Cliente,Endereco } from '../../cliente-taype';
@Component({
  selector: 'app-cliente-form',
  imports: [SplitterModule,FloatLabelModule,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.scss'
})
export class ClienteFormComponent implements OnInit{


form!:FormGroup

@Output () envio = new EventEmitter()
@Output () cancelarEnvio = new EventEmitter()
@Input() cliente?: Cliente
@Input () text = "Salvar"
@Input() cancel = "Cancelar"

constructor(
  private router: Router,
  private formBuilder:FormBuilder,
  private clienteService: ClienteService
){}

ngOnInit(): void {
  this.criarFromulario();

  if (this.cliente) {
    this.form.patchValue(this.cliente);

    // Marca todos os campos do formulário como tocados
    this.marcarCamposComoTocados(this.form);
  }

  this.ouvirCEP();
}
criarFromulario():void{
  this.form = this.formBuilder.group({
    nome: [this.cliente ? this.cliente?.nome : ''],
    documento: [this.cliente ? this.cliente?.documento : ''],
    contato: this.formBuilder.group({
      telefone: [this.cliente ? this.cliente.contato?.telefone : ''],
      email: [this.cliente ? this.cliente.contato?.email : ''],
    }),
    endereco: this.formBuilder.group({
      cep: [this.cliente ? this.cliente.endereco?.cep : ''],
      logradouro: [this.cliente ? this.cliente.endereco?.logradouro : ''],
      numero: [this.cliente ? this.cliente.endereco?.numero : ''],
      bairro: [this.cliente ? this.cliente.endereco?.bairro : ''],
      estado: [this.cliente ? this.cliente.endereco?.estado : ''],
      complemento: [this.cliente ? this.cliente.endereco?.complemento : ''],
    }),
},);}

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

ouvirCEP(): void {
  this.form.get('endereco.cep')?.valueChanges.subscribe((cep: string) => {
    if (cep && cep.length >= 8) {
      this.clienteService.buscarEnderecoAPI(cep).subscribe((endereco) => {
        const patch = {
          logradouro: endereco.logradouro || '',
          bairro: endereco.bairro || '',
          estado: endereco.estado || '',
        };
        this.form.get('endereco')?.patchValue(patch);

        // Marca campos como tocados para validação visual
          for (let campo of Object.keys(patch)) {
          const control = this.form.get(`endereco.${campo}`);
          control?.markAsDirty();
          control?.markAsTouched();
          control?.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  });
}

enviar():void
{
  this.envio.emit(this.form.value);
}

cancelar(){
  this.cancelarEnvio.emit(this.router.navigate(['home/clientes']));
}
}

