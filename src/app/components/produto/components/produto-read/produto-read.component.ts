import { Produto } from './../../produto.type';

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
 import{MatIconModule } from '@angular/material/icon';
 import { RouterLink } from '@angular/router';
 import{MatDialogModule } from '@angular/material/dialog';
 import{MatDialog } from '@angular/material/dialog';
import{ActivatedRoute} from '@angular/router';

import { ProdutoService } from '../../produto.service';
import { ProdutoUpdateComponent } from '../produto-update/produto-update.component';

@Component({
  selector: 'app-produto-read',
  imports: [CommonModule, TableModule, MatIconModule , MatDialogModule],
  templateUrl: './produto-read.component.html',
  styleUrl: './produto-read.component.scss'
})
export class ProdutoReadComponent implements OnInit {
formDate!:FormData
  produtos!: Produto[]

  constructor(
    private produtoService: ProdutoService,
    private dialog: MatDialog,
    private activateRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.produtoService.listarProdutos().subscribe((dados) => {
      this.produtos = dados;
    });
  }



  editarProduto(id:number){
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
excluirProduto(id:number){
  this.produtoService.deletarProduto(id).subscribe(() => {
    this.produtos = this.produtos.filter(produto => produto.id !== id);
  })
}
}


