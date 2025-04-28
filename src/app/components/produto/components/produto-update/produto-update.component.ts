import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Produto } from './../../produto.type';
import { ProdutoService } from "../../produto.service";
import { ProdutoFormComponent } from "../produto-form/produto-form.component";

@Component({
  selector: 'app-produto-update',
  imports: [ProdutoFormComponent],
  templateUrl: './produto-update.component.html',
  styleUrl: './produto-update.component.scss'
})
export class ProdutoUpdateComponent implements OnInit {
  formData!: FormData
  produto!: Produto

  constructor(
    private produtoService: ProdutoService,
    private toastr: ToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,

    private dialogRef: MatDialogRef<ProdutoUpdateComponent>,
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.produto = this.data;
    }
  }
  atualizarProduto(formData: FormData) {

    console.log(formData);
    this.produtoService.editarProduto(this.produto.id, formData).subscribe({
      next: () => {
        this.toastr.success('Produto atualizado com sucesso!', 'Sucesso')
        this.router.navigate(['home/produtos'])
      },
      error: () => {
        this.toastr.error('Produto nao atualizado, verifique o preenchimento, e tente novamente', 'Erro')
        this.router.navigate(['produtos-update'])
      }
    })

    this.router.navigate(['home/produtos'])
    window.location.reload();
  }


  cancelar(){
  this.dialogRef.close();
  this.router.navigate(['home/produtos']);
  }

}
