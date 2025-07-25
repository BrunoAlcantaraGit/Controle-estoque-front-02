import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';


import { MatPaginatorModule } from '@angular/material/paginator';

import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';


import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


import { Venda } from '../venta.type';
import { VendasService } from '../vendas.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-venda-read',
  imports: [MatTableModule,TableModule, MatCheckboxModule, MatButtonModule, MatIconModule, FormsModule, CommonModule, MatPaginatorModule],
  standalone: true,
  templateUrl: './venda-read.component.html',
  styleUrl: './venda-read.component.scss'
})
export class VendaReadComponent implements OnInit {

   vendas!: Venda[];
  

constructor(
private vendasService: VendasService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) {} 

ngOnInit(): void {
    this.vendasService.listarVendas().subscribe((dados) => {
      this.vendas = dados;
    });
}


excluir(id: number) {
  this.vendasService.deletar(id).subscribe(() => {
    this.toastrService.success('Venda excluída com sucesso!');
    this.vendas = this.vendas.filter(venda => venda.id !== id);
  }, () => {
    this.toastrService.error('Erro ao excluir venda.');
  });
}
}
