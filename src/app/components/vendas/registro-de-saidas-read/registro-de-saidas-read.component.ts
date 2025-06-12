import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import{ToastrService} from 'ngx-toastr';
import { Router } from '@angular/router';

import { Saida } from './../saida/saida.type';
import { SaidaService } from './../saida/saida.service';
import { ProdutoService } from '../../produto/produto.service';
import { Produto } from '../../produto/produto.type';


@Component({
  selector: 'app-registro-de-saidas-read',
  imports: [MatTableModule,MatCheckboxModule,MatButtonModule,MatIconModule,FormsModule,CommonModule],
  templateUrl: './registro-de-saidas-read.component.html',
  styleUrl: './registro-de-saidas-read.component.scss',
  providers: [ProdutoService]

})
export class RegistroDeSaidasReadComponent implements OnInit {

  saidas: Saida[] = []
  selectedProducts!: Saida[];
  colunas: string[] = ['selecionado', 'quantidade', 'produto', 'cliente', 'totalDaVenda', 'acoes'];
  selecionado?: boolean;
  produto?: Produto
  constructor(
   private saidaService : SaidaService,
   private produtoService: ProdutoService,
   private toastrService: ToastrService,
   private router: Router

  ){}
  ngOnInit() {
    this.saidaService.listar().subscribe((data) => {
        this.saidas = data;
        console.log(this.saidas);
    });

}

gerarOrcamento(){
  this.router.navigate(['home/vendas-create']);
}

 todosSelecionados(): boolean {
    return this.saidas.every(s => s.selecionado);
  }

  indeterminado(): boolean {
    return this.saidas.some(s => s.selecionado) && !this.todosSelecionados();
  }

  selecionarTodos(valor: boolean): void {
    this.saidas.forEach(s => s.selecionado = valor);
  }
  verSelecionados(): void {
    const selecionados = this.saidas.filter(s => s.selecionado);
    alert(`Selecionados: ${selecionados.map(s => s.produtos).join(', ') || 'Nenhum'}`);
  }

  excluirRegistroSaida(id:number){}


}
