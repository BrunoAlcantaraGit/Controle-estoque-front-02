
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import{ CommonModule } from '@angular/common';

import { Cliente}  from './../../cliente-taype';
import{ClienteService} from '../../cliente.service';
import { ClienteFormComponent } from "../cliente-form/cliente-form.component";


@Component({
  selector: 'app-cliente-create',
  imports: [ClienteFormComponent,CommonModule],
  templateUrl: './cliente-create.component.html',
  styleUrl: './cliente-create.component.scss'
})
export class ClienteCreateComponent {

  constructor(
    private ClienteService: ClienteService,
    private router: Router,
    private toastService: ToastrService,
  ){}

  salvarCliente(cliente: Cliente){
    this.ClienteService.salvar(cliente).subscribe({
      next: () => {
        this.toastService.success('Fornecedor cadastrado com sucesso!', 'Sucesso');
        this.router.navigate(['home/clientes']);
      },
      error:(error) => this.toastService.error("Usuário ja está cadastrado"),
    })

}

}
