
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
 import{MatIconModule } from '@angular/material/icon';
 import { RouterLink } from '@angular/router';
 import{MatDialogModule } from '@angular/material/dialog';
 import{MatDialog } from '@angular/material/dialog';
import{ActivatedRoute} from '@angular/router';


import { Produto} from '../../produto.type';
import { ProdutoService } from '../../produto.service';

@Component({
  selector: 'app-produto-read',
  imports: [CommonModule, TableModule, MatIconModule, RouterLink, MatDialogModule],
  templateUrl: './produto-read.component.html',
  styleUrl: './produto-read.component.scss'
})
export class ProdutoReadComponent {

  produtos!: Produto[]

  editarProduto(id:number){}

  excluirProduto(id:number){}
}
