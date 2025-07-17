import { Component } from '@angular/core';
import { ProdutoFormComponent } from "../produto-form/produto-form.component";
import { ClienteReadComponent } from "../../../Clientes/components/cliente-read/cliente-read.component";
import { PainelReadComponent } from "../../../painel-saidas/components/painel-read/painel-read.component";
import { Router } from '@angular/router';
import { ProdutoReadComponent } from "../produto-read/produto-read.component";

@Component({
  selector: 'app-produto',
  imports: [ProdutoReadComponent],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss'
})
export class ProdutoComponent {

  constructor(
    private router: Router
  ) { }

  cadastrarProduto() {
    this.router.navigate(['home/produtos-create'])
  }

}

