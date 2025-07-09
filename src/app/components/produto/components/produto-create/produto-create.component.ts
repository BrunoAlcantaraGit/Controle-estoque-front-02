import { routes } from './../../../../app.routes';
import { Component } from '@angular/core';
import { ProdutoFormComponent } from '../produto-form/produto-form.component';
import { Produto } from '../../produto.type';
import { ProdutoService } from '../../produto.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-produto-create',
  imports: [ProdutoFormComponent],
  templateUrl: './produto-create.component.html',
  styleUrl: './produto-create.component.scss'
})
export class ProdutoCreateComponent {
   produto!: Produto
   formData!: FormData

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private toastrService: ToastrService

  ){}

  enviar(formData:FormData){

    console.log(formData)
    this.produtoService.salvar(formData).subscribe({
      next: () => {
        this.toastrService.success('Produto cadastrado com sucesso!', 'Sucesso')
        this.router.navigate(['home/produtos'])
        
      },
      error: () => {
        this.toastrService.error('Produto não registrado, verifique o preenchimento, e tente novamente', 'Erro')
        this.router.navigate(['home/produtos-create'])
      }
    })
    this.router.navigate(['home/produtos'])
   
  }

}
