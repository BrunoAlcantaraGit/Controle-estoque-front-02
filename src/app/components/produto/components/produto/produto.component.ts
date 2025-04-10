import { Component } from '@angular/core';
import { ProdutoFormComponent } from "../produto-form/produto-form.component";

@Component({
  selector: 'app-produto',
  imports: [ProdutoFormComponent],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss'
})
export class ProdutoComponent {


}

