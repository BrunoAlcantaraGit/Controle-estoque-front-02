
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
 import{MatIconModule } from '@angular/material/icon';
 import { RouterLink } from '@angular/router';
 import{MatDialogModule } from '@angular/material/dialog';
 import{MatDialog } from '@angular/material/dialog';
import { FornecedorUpdateComponent } from '../fornecedor-update/fornecedor-update.component';
import{ActivatedRoute} from '@angular/router';

import { Fornecedor } from '../../fornecedor.type';
import { FornecedorServiceService } from '../../fornecedor-service.service';




@Component({
  selector: 'app-fornecedor-read',
  imports: [TableModule,CommonModule,MatIconModule,RouterLink,MatDialogModule],
  templateUrl: './fornecedor-read.component.html',
  styleUrl: './fornecedor-read.component.scss'
})
export class FornecedorReadComponent implements OnInit{
constructor(
  private customerService: FornecedorServiceService,
  private dialog: MatDialog,
  private activateRoute: ActivatedRoute
) {}
id!: number
fornecedor: Fornecedor[] =[];

ngOnInit(): void {
  this.customerService.listarFornecedores().subscribe((dados) => {
    this.fornecedor = dados;
  });
}

editarFornecedor(id: number) {
  console.log("id clicado", id);
  this.customerService.listarPorId(id).subscribe(fornecedor => {
    console.log(fornecedor);
    const dialogRef = this.dialog.open(FornecedorUpdateComponent, {
      panelClass: 'custom-dialog',
      data: fornecedor,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.customerService.listarFornecedores().subscribe(fornecedores => this.fornecedor = fornecedores);

      }

    });
  });
}
excluirFornecedor(id:number){
this.customerService.deletarPorId(id).subscribe(() => {
  this.fornecedor = this.fornecedor.filter(fornecedor => fornecedor.id !== id);
})
  }
}


