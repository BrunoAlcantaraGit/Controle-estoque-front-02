
import { Component } from '@angular/core';
import { FornecedorFormComponent } from "../fornecedor-form/fornecedor-form.component";
import { Fornecedor } from '../../fornecedor.type';
import { FornecedorServiceService } from '../../fornecedor-service.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-fornecedor-create',
  imports: [FornecedorFormComponent],
  standalone: true,
  templateUrl: './fornecedor-create.component.html',
  styleUrl: './fornecedor-create.component.scss'
})
export class FornecedorCreateComponent {

constructor(
  private fornecedorService: FornecedorServiceService,
  private toastService: ToastrService
)
{}

 title = 'Cadastro de Fornecedor';

  cadastrarFornecedor(fornecedor: Fornecedor){
    console.log(fornecedor);
    this.fornecedorService.cadastrarFornecedor(fornecedor).subscribe({
      next: () => {
        this.toastService.success('Fornecedor cadastrado com sucesso!', 'Sucesso');
      },
      error:(error) => this.toastService.error("Usuário ja está cadastrado"),
    })

  }

}
