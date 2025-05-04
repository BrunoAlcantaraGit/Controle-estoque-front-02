import { Saida } from './../saida.type';
import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


import { SaidaFormComponent } from "../saida-form/saida-form.component";
import { SaidaService } from '../saida.service';
import { ProdutoService } from '../../../produto/produto.service';
import { Router } from '@angular/router';
import { Produto } from '../../../produto/produto.type';

@Component({
  selector: 'app-saida-create',
  imports: [SaidaFormComponent],
  templateUrl: './saida-create.component.html',
  styleUrl: './saida-create.component.scss'
})
export class SaidaCreateComponent{

constructor(
private saidaService: SaidaService,
private produtoService: ProdutoService,
private router: Router
){}



@Input() produto?: Produto

registrarSaida(saida: Saida) {
if (!this.produto) return;

  const quantidadeAtual = this.produto.quantidade;

  if (quantidadeAtual >= saida.quantidade) {
    const novaQuantidade = quantidadeAtual - saida.quantidade;
    const produtoAtualizado = { ...this.produto, quantidade: novaQuantidade };
    const formData = new FormData();
    formData.append('quantidade', produtoAtualizado.quantidade.toString());

    this.produtoService.editarProduto(this.produto.id, formData).subscribe(() => {
       this.saidaService.registrarSaida(saida).subscribe(() => {
        this.router.navigate(['home/vendas-form']);
      });
    });

  } else {
    alert('Quantidade insuficiente em estoque.');
  }
}

}
