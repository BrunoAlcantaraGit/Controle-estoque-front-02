import { Component } from '@angular/core';
import { ProdutoFormComponent } from "../produto-form/produto-form.component";

@Component({
  selector: 'app-produto-update',
  imports: [ProdutoFormComponent],
  templateUrl: './produto-update.component.html',
  styleUrl: './produto-update.component.scss'
})
export class ProdutoUpdateComponent {
 formData!: FormData

  atualizarProduto(formData:FormData){
    
  }

}
