import { Component } from '@angular/core';
import { ClienteReadComponent } from "../cliente-read/cliente-read.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  imports: [ClienteReadComponent],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss'
})
export class ClienteComponent {

  constructor(private router: Router) {}

  cadastrarCliente() {
    this.router.navigate(['home/clientes-create']);
  }

}
