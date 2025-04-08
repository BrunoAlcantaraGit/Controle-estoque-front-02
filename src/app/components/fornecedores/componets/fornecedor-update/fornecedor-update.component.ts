import { Fornecedor,Endereco,Contato } from './../../fornecedor.type';
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
import { ToastrService } from 'ngx-toastr';
import{ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-fornecedor-update',
  imports: [CommonModule,FormsModule,MatDialogModule,ReactiveFormsModule,FornecedorFormComponent],
  templateUrl: './fornecedor-update.component.html',
  styleUrl: './fornecedor-update.component.scss'
})
export class FornecedorUpdateComponent implements OnInit {

  fornecedor!: Fornecedor



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FornecedorUpdateComponent>,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private fornecedorService: FornecedorServiceService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.fornecedor = this.data;
  }
  }

  atualizarFornecedor(Fornecedor: Fornecedor){
    this.fornecedorService.atualizarFornecedor(this.fornecedor.id, Fornecedor).subscribe(fornecedor => {

    })
    this.toastrService.success('Fornecedor atualizado com sucesso!');
    this.dialogRef.close();
    window.location.reload();

  }


  fechar() {
    this.dialogRef.close();
    this.router.navigate(['home/fornecedores']);
  }
}
