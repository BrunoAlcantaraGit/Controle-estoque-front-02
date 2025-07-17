import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';


import { Produto } from '../../../produto/produto.type';
import { ProdutoService } from '../../../produto/produto.service';
import { OrcamentoFormComponent } from '../orcamento-form/orcamento-form.component';

@Component({
  selector: 'app-orcamento-read',
  imports: [MatDialogModule, MatIconModule, TableModule, CommonModule],
  templateUrl: './orcamento-read.component.html',
  styleUrl: './orcamento-read.component.scss'
})
export class OrcamentoReadComponent implements OnInit {

  constructor(
    private produtoService: ProdutoService,
    private dialog: MatDialog,
  ) { }

  formDate!: FormData
  produtos!: Produto[]


  ngOnInit(): void {
    this.produtoService.listarProdutos().subscribe((dados) => {
      this.produtos = dados;

    });
  }


  openOrcamento(id: number) {
    this.produtoService.buscarProduto(id).subscribe(produto => {
      const dialogRef = this.dialog.open(OrcamentoFormComponent, {
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
