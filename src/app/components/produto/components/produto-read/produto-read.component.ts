import { Produto } from './../../produto.type';

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { ProdutoService } from '../../produto.service';
import { ProdutoUpdateComponent } from '../produto-update/produto-update.component';

@Component({
  selector: 'app-produto-read',
  imports: [CommonModule, TableModule, MatIconModule, MatDialogModule],
  templateUrl: './produto-read.component.html',
  styleUrl: './produto-read.component.scss'
})
export class ProdutoReadComponent implements OnInit {
  formDate!: FormData
  produtos!: Produto[]

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private dialog: MatDialog,
    private activateRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.produtoService.listarProdutos().subscribe((dados) => {
      this.produtos = dados;
    });
  }



  editarProduto(id: number) {
    this.produtoService.buscarProduto(id).subscribe(produto => {
      const dialogRef = this.dialog.open(ProdutoUpdateComponent, {
        data: produto,
        disableClose: true
      })

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.produtoService.listarProdutos().subscribe(produtos => this.produtos = produtos);

        }


      })
    })

  }
  excluirProduto(id: number) {
    const confirmation = confirm("Você tem certeza que deseja excluir este produto?");
    if (!confirmation) {
      return;
    }

    this.produtoService.deletarProduto(id).subscribe({
      next: () => {
        this.produtos = this.produtos.filter(produto => produto.id !== id);
      },
      error: (err: any) => {
        if (err.status === 403) {
           this.toastrService.error('Não é possível excluir um produto vinculado a uma orçamento', 'Erro',{
          timeOut: 100000,
          progressBar: true
        });
        } else {
          alert("Erro ao excluir produto.");
        }
      }
    });


  }
}


