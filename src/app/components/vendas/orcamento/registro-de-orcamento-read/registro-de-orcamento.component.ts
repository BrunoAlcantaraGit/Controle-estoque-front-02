import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';



import { Orcamento } from '../orcamento.type';
import { OrcamentoService } from '../orcamento.service';
import { ProdutoService } from '../../../produto/produto.service';
import { VendasService } from '../../vendas.service';
import { Produto } from '../../../produto/produto.type';
import { Venda } from '../../venta.type';


@Component({
  selector: 'app-registro-de-saidas-read',
  imports: [MatTableModule, MatCheckboxModule, MatButtonModule, MatIconModule, FormsModule, CommonModule, MatPaginatorModule],
  templateUrl: './registro-de-orcamento.component.html',
  styleUrl: './registro-de-orcamento.component.scss',
  providers: [ProdutoService]



})
export class RegistroDeSaidasReadComponent implements OnInit {

  orcamentos: Orcamento[] = []
  orcamento?: Orcamento;
  selectedProducts!: Orcamento[];
  colunas: string[] = ['selecionado', 'quantidade', 'produto', 'cliente', 'totalDaVenda', 'acoes'];
  selecionado?: boolean;
  produto?: Produto
  venda?: Venda


  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(

    private dialog: MatDialog,
    private orcamentoService: OrcamentoService,
    private vendaService: VendasService,
    private toastrService: ToastrService,
    private router: Router




  ) { }
  ngOnInit() {
    this.orcamentoService.listar().subscribe((data) => {
      this.orcamentos = data;
      this.dataSource.data = data;
      console.log(this.orcamentos);
    });
    

  }



  excluirRegistroOrcamento(id: number) {
    const confirmacao = confirm('Você tem certeza que deseja excluir este registro de orçamento?');
    if (!confirmacao) {
      return;
    }


    this.orcamentoService.deletar(id).subscribe({

      next: () => {
        this.toastrService.success('Registro de orçamento excluído com sucesso!', 'Sucesso');
        this.orcamentos = this.orcamentos.filter(o => o.id !== id);
        this.dataSource.data = this.orcamentos;
      },
      error: (error) => {
        this.toastrService.error('Erro ao excluir registro de orçamento', 'Erro');
        console.error(error);
      }
    });
  }



vender() {
  const selecionados = this.orcamentos.filter(o => o.selecionado);

  if (selecionados.length === 0) {
    this.toastrService.error('Nenhum registro selecionado', 'Erro');
    return;
  }

  // Usa clienteID do primeiro
  const clienteId = selecionados[0].clienteID;

  // Verifica se todos são do mesmo cliente
  const clientesDistintos = selecionados.some(o => o.clienteID !== clienteId);
  if (clientesDistintos) {
    this.toastrService.error('Todos os orçamentos devem ser do mesmo cliente', 'Erro');
    return;
  }

  // IDs dos produtos (já estão direto no orçamento)
  const produtoIdsSet: number[]=[];
  selecionados.forEach(o => produtoIdsSet.push(o.produtoID));
  const produtoIds = Array.from(produtoIdsSet);

  // IDs dos orçamentos
  const orcamentoIds = selecionados.map(o => o.id);

  // Somatórios
  const lucro = selecionados.reduce((acc, o) => acc + (o.lucroTransacao ?? 0), 0);
  const valorTotalDaVenda = selecionados.reduce((acc, o) => acc + (o.totalDaVenda ?? 0), 0);

  const venda: Venda = {
    clienteId,
    produtoIds,
    orcamentoIds,
    lucro,
    valorTotalDaVenda
  };

  console.log(venda);

  this.vendaService.salvar(venda).subscribe({
    next: () => {
      this.toastrService.success('Venda realizada com sucesso!', 'Sucesso');
      // Atualizar lista e limpar seleção
    },
    error: (err) => {
      this.toastrService.error('Erro ao realizar a venda', 'Erro');
      console.error(err);
    }
  });
}






  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  gerarOrcamento() {
    this.router.navigate(['home/orcamento-read']);
  }

  todosSelecionados(): boolean {
    return this.orcamentos.every(o => o.selecionado);
  }

  indeterminado(): boolean {
    return this.orcamentos.some(o => o.selecionado) && !this.todosSelecionados();
  }

  selecionarTodos(valor: boolean): void {
    this.orcamentos.forEach(o => o.selecionado = valor);
  }
  verSelecionados(): void {
    const selecionados = this.orcamentos.filter(o => o.selecionado);
    alert(`Selecionados: ${selecionados.map(o => o.produtos).join(', ') || 'Nenhum'}`);
  }


}