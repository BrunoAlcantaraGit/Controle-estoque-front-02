import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Router } from '@angular/router';
import { SplitterModule } from 'primeng/splitter';
import { InputMaskModule } from 'primeng/inputmask';

import { FornecedorServiceService } from '../../fornecedor-service.service';
import { Fornecedor } from '../../fornecedor.type';

@Component({
  selector: 'app-fornecedor-form',
  standalone: true,
  imports: [CommonModule, FormsModule, FloatLabelModule, SplitterModule, ReactiveFormsModule,InputMaskModule],
  templateUrl: './fornecedor-form.component.html',
  styleUrl: './fornecedor-form.component.scss'
})
export class FornecedorFormComponent implements OnInit {

  @Output() envio = new EventEmitter<Fornecedor>();
  @Output() cancelarEnvio = new EventEmitter<void>();

  @Input() fornecedor!: Fornecedor;
  @Input() text = "Salvar";
  @Input() cancel = "Cancelar";
  @Input() value = "";

  form!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private fornecedorService: FornecedorServiceService
  ) {}

  ngOnInit(): void {
    this.criarFormulario();

    if (this.fornecedor) {
      this.form.patchValue(this.fornecedor);

      this.marcarCamposComoTocados(this.form);
    }

    this.ouvirCEP();
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

  criarFormulario(): void {
    this.form = this.formBuilder.group({
      nome: [this.fornecedor ? this.fornecedor?.nome :'' ,],
      documento: [this.fornecedor ? this.fornecedor?.documento : '',],

      contato: this.formBuilder.group({
        telefone: [this.fornecedor? this.fornecedor.contato?.telefone : ''],
        email: [this.fornecedor ? this.fornecedor.contato?.email : ''],
      }),

      endereco: this.formBuilder.group({
        cep: [this.fornecedor ? this.fornecedor.endereco?.cep : '',],
        logradouro: [this.fornecedor ? this.fornecedor.endereco?.logradouro : ''],
        numero: [this.fornecedor ? this.fornecedor.endereco?.numero : ''],
        bairro: [this.fornecedor ? this.fornecedor.endereco?.bairro : ''],
        estado: [this.fornecedor ? this.fornecedor.endereco?.estado : ''],
        complemento: [this.fornecedor ? this.fornecedor.endereco?.complemento : ''],
      }),
    });
  }

  ouvirCEP(): void {
    this.form.get('endereco.cep')?.valueChanges.subscribe((cep: string) => {
      if (cep && cep.length >= 8) {
        this.fornecedorService.buscarEndereco(cep).subscribe((endereco) => {
          const patch = {
            logradouro: endereco.logradouro || '',
            bairro: endereco.bairro || '',
            estado: endereco.estado || '',
          };
          this.form.get('endereco')?.patchValue(patch);


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

  enviar(): void {
    this.envio.emit(this.form.value);
  }

  cancelar(): void {
    this.cancelarEnvio.emit(); 
  }

}
