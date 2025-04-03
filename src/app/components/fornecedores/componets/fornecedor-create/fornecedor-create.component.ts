
import { Component } from '@angular/core';
import { FornecedorFormComponent } from "../fornecedor-form/fornecedor-form.component";
import { Fornecedor } from '../../fornecedor.type';


@Component({
  selector: 'app-fornecedor-create',
  imports: [FornecedorFormComponent],
  templateUrl: './fornecedor-create.component.html',
  styleUrl: './fornecedor-create.component.scss'
})
export class FornecedorCreateComponent {

  cadastrarFornecedor(Fornecedor: Fornecedor){
    
  }

}
