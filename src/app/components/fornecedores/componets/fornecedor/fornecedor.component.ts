import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Fornecedor } from '../../fornecedor.type';
import { FornecedorFormComponent } from '../fornecedor-form/fornecedor-form.component';
import { Router } from '@angular/router';
import { FornecedorReadComponent } from "../fornecedor-read/fornecedor-read.component";


@Component({
  selector: 'app-fornecedor',
  imports: [FornecedorFormComponent, FornecedorReadComponent],
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.scss']
})
export class FornecedorComponent {

constructor(private router: Router){}

cadastrarFornecedor(): void {
  this.router.navigate(["home/form"]);
}

}
