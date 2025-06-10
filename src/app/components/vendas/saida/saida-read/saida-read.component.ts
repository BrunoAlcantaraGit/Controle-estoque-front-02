import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';



import { Produto} from '../../../produto/produto.type';
import { ProdutoService } from '../../../produto/produto.service';


@Component({
  selector: 'app-saida-read',
  imports: [ MatIconModule,  MatButtonModule, MatCheckboxModule, MatTableModule, FormsModule, CommonModule],
  templateUrl: './saida-read.component.html',
  styleUrl: './saida-read.component.scss'
})
export class SaidaReadComponent {

  constructor(
    private produtoService: ProdutoService,

  ){}

  formDate!:FormData
  produtos: Produto[]= [];
  selectedProducts!: Produto[];
  colunas: string[] = ['selecionado', 'quantidade', 'produto', 'venda'];
  selecionado?: boolean;

    ngOnInit(): void {
      this.produtoService.listarProdutos().subscribe((dados) => {
        this.produtos = dados;
        console.log(this.produtos);
      });
    }

 todosSelecionados(): boolean {
    return this.produtos.every(p => p.selecionado);
  }

  indeterminado(): boolean {
    return this.produtos.some(s => s.selecionado) && !this.todosSelecionados();
  }

  selecionarTodos(valor: boolean): void {
    this.produtos.forEach(p => p.selecionado = valor);
  }
  verSelecionados(): void {
    const selecionados = this.produtos.filter(p => p.selecionado);
    alert(`Selecionados: ${selecionados.map(p => p.descricao).join(', ') || 'Nenhum'}`);
  }



}
