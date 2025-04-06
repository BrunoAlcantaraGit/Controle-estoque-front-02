import { Fornecedor } from './../../fornecedor.type';
import { FornecedorServiceService } from '../../fornecedor-service.service';

import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ReactiveFormsModule} from '@angular/forms';
import{FormsModule} from '@angular/forms';
import{MatDialogModule} from '@angular/material/dialog';
import { FornecedorFormComponent } from '../fornecedor-form/fornecedor-form.component';
import { Router } from '@angular/router';
import{ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-fornecedor-update',
  imports: [CommonModule,FormsModule,MatDialogModule,ReactiveFormsModule,FornecedorFormComponent],
  templateUrl: './fornecedor-update.component.html',
  styleUrl: './fornecedor-update.component.scss'
})
export class FornecedorUpdateComponent implements OnInit {

  fornecedor!: Fornecedor
  id!: number

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FornecedorUpdateComponent>,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private fornecedorService: FornecedorServiceService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.fornecedor = this.data;
      console.log("Fornecedor recebido no modal:", this.fornecedor);
  }
  }

  atualizarFornecedor(Fornecedor: Fornecedor){}


  fechar() {
    this.dialogRef.close();
    this.router.navigate(['home/fornecedores']);
  }
}
