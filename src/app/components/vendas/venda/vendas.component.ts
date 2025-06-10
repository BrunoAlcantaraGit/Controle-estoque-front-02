import { routes } from './../../../app.routes';
import { Component } from '@angular/core';
import { RegistroDeSaidasReadComponent } from '../registro-de-saidas-read/registro-de-saidas-read.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendas',
  imports: [RegistroDeSaidasReadComponent],
  templateUrl: './vendas.component.html',
  styleUrl: './vendas.component.scss'
})
export class VendasComponent {
constructor(
  private router: Router
){}

registrarSaida(){
this.router.navigate(['home/vendas-create']);
  }
  }
