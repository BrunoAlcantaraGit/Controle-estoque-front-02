
import { Component } from '@angular/core';
import { FornecedorFormComponent } from "../fornecedor-form/fornecedor-form.component";
import { Fornecedor } from '../../fornecedor.type';
import { FornecedorServiceService } from '../../fornecedor-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


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
  private toastService: ToastrService,
  private router: Router
)
{}

 title = 'Cadastro de Fornecedor';

  cadastrarFornecedor(fornecedor: Fornecedor){

    this.fornecedorService.cadastrarFornecedor(fornecedor).subscribe({
      next: () => {
        this.toastService.success('Fornecedor cadastrado com sucesso!', 'Sucesso');
        this.router.navigate(['home/fornecedores']);
      },
      error:(error) => this.toastService.error("Usuário ja está cadastrado"),
    })

  }

  fechar() {
    this.router.navigate(['home/fornecedores']);
  } 

}
