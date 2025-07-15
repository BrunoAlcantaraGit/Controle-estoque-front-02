import { Component, OnInit} from '@angular/core';
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
import { MatDialog } from '@angular/material/dialog';



import { Orcamento } from '../orcamento.type';
import { OrcamentoService } from '../orcamento.service';
import { ProdutoService } from '../../../produto/produto.service';
import { VendasService } from '../../vendas.service';
import { Produto } from '../../../produto/produto.type';
import { Venda } from '../../venta.type';


@Component({
  selector: 'app-registro-de-saidas-read',
  imports: [MatTableModule,MatCheckboxModule,MatButtonModule,MatIconModule,FormsModule,CommonModule,MatPaginatorModule],
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
   private orcamentoService : OrcamentoService,
   private vendaService: VendasService,
   private toastrService: ToastrService,
   private router: Router
   
   
   

  ){}
  ngOnInit() {
    this.orcamentoService.listar().subscribe((data) => {
       this.orcamentos = data;
       this.dataSource.data = data;
    });


}



excluirRegistroOrcamento(id:number){
  const confirmacao = confirm('Você tem certeza que deseja excluir este registro de orçamento?');
  if (!confirmacao) {
    return;
  }
  if (!this.produto?.id) return;

  const quantidadeAtual = this.produto.quantidade;
  
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



vender(){  
    const selcionados = this.orcamentos.filter(o => o.selecionado);
    if (selcionados.length > 0) {
     console.log(selcionados);

    }else{
      this.toastrService.error('Nenhum registro selecionado', 'Erro');
      return;
    }

    /*const clienteID = Number; // Supondo que você tenha um clienteId definido
    const produtoIds: number[] = [];
    const orcamentoIds: number[] = [];
    let lucro = 0;
    let valorTotalDaVenda = 0;

    selcionados.forEach(o => {
        if (Array.isArray(o.produtos)) {
            produtoIds.push(...o.produtos.map(p => p.id));
        } else if (o.produtos) {
            produtoIds.push(o.produtos);
        }

        orcamentoIds.push(o.id);
        lucro += o.lucroTransacao || 0;
        valorTotalDaVenda += o.totalDaVenda || 0;
    });

    const vendaDTO: Venda = {
        id: 0, // Defina o ID da venda se necessário
        clienteId: 0,
        produtoIds: produtoIds,
        orcamentoIds: orcamentoIds,
        lucro: lucro,
        valorTotalDaVenda: valorTotalDaVenda
    };

    console.log(vendaDTO);

    this.vendaService.salvar(vendaDTO).subscribe({
        next: (response) => { 
            this.toastrService.success('Venda criada com sucesso!', 'Sucesso');
            this.router.navigate(['home/venda-read']);
        }
    });*/
}





ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


gerarOrcamento(){
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