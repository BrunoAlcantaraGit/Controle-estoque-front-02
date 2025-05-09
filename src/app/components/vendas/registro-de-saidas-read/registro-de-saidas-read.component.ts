import { Component,OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { Saida } from './../saida/saida.type';
import { SaidaService } from './../saida/saida.service';


@Component({
  selector: 'app-registro-de-saidas-read',
  imports: [TableModule,FormsModule,CommonModule],
  templateUrl: './registro-de-saidas-read.component.html',
  styleUrl: './registro-de-saidas-read.component.scss'
})
export class RegistroDeSaidasReadComponent implements OnInit {

  saidas: Saida[] = []
  selectedProducts!: Saida;


  constructor(
   private saidaService : SaidaService
  ){}
  ngOnInit() {
    this.saidaService.listar().subscribe((data) => {
        this.saidas = data;
        console.log(this.saidas);
    });

}

}
