import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
 import{MatIconModule } from '@angular/material/icon';
 import { RouterLink } from '@angular/router';
 import{MatDialogModule } from '@angular/material/dialog';
 import{MatDialog } from '@angular/material/dialog';
import{ActivatedRoute} from '@angular/router';


import { Produto} from '../../../produto/produto.type';
import { ProdutoService } from '../../../produto/produto.service';
import { VendasFormComponent } from '../../vendas-form/vendas-form.component';
import { SaidaFormComponent } from '../saida-form/saida-form.component';

@Component({
  selector: 'app-saida-read',
  imports: [MatDialogModule, MatIconModule,  TableModule, CommonModule],
  templateUrl: './saida-read.component.html',
  styleUrl: './saida-read.component.scss'
})
export class SaidaReadComponent {

  constructor(
    private produtoService: ProdutoService,
    private dialog: MatDialog,
    private activateRoute: ActivatedRoute
  ){}



  formDate!:FormData
  produtos!: Produto[]


registrarSaida(){}

    ngOnInit(): void {
      this.produtoService.listarProdutos().subscribe((dados) => {
        this.produtos = dados;

      });
    }







    openSaida(id:number){
      this.produtoService.buscarProduto(id).subscribe(produto => {
        const dialogRef = this.dialog.open(SaidaFormComponent, {
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

}
