import { Component } from '@angular/core';
import { ProdutoFormComponent } from '../produto-form/produto-form.component';
import { Produto } from '../../produto.type';
import { ProdutoService } from '../../produto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto-create',
  imports: [ProdutoFormComponent],
  templateUrl: './produto-create.component.html',
  styleUrl: './produto-create.component.scss'
})
export class ProdutoCreateComponent {
   produto!: Produto

  constructor(
    private produtoService: ProdutoService,
    private router: Router

  ){}

  salvarCliente(produto:Produto){
    this.produtoService.salvar(produto).subscribe(() => this.router.navigate(['home/produtos']));
  }

}
