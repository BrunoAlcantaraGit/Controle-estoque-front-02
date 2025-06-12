import { routes } from './../../../app.routes';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendas',
  imports: [],
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
