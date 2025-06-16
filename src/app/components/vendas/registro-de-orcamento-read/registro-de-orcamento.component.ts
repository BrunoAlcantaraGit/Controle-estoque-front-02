import { Component, OnInit, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import{ToastrService} from 'ngx-toastr';
import{MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Saida } from '../orcamento/orcamento.type';
import { OrcamentoService } from '../orcamento/orcamento.service';
import { ProdutoService } from '../../produto/produto.service';
import { Produto } from '../../produto/produto.type';


@Component({
  selector: 'app-registro-de-saidas-read',
  imports: [MatTableModule,MatCheckboxModule,MatButtonModule,MatIconModule,FormsModule,CommonModule,MatPaginatorModule],
  templateUrl: './registro-de-orcamento.component.html',
  styleUrl: './registro-de-orcamento.component.scss',
  providers: [ProdutoService]
  


})
export class RegistroDeSaidasReadComponent implements OnInit {

  saidas: Saida[] = []
  selectedProducts!: Saida[];
  colunas: string[] = ['selecionado', 'quantidade', 'produto', 'cliente', 'totalDaVenda', 'acoes'];
  selecionado?: boolean;
  produto?: Produto

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
   private orcamentoService : OrcamentoService,
   private produtoService: ProdutoService,
   private toastrService: ToastrService,
   private router: Router

  ){}
  ngOnInit() {
    this.orcamentoService.listar().subscribe((data) => {
       this.saidas = data;
       this.dataSource.data = data;
    });


}



ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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


  venda(){}

}
