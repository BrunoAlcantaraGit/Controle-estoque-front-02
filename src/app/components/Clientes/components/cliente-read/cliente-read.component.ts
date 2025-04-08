import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
 import{MatIconModule } from '@angular/material/icon';
 import { RouterLink } from '@angular/router';
 import{MatDialogModule } from '@angular/material/dialog';
 import{MatDialog } from '@angular/material/dialog';
import{ActivatedRoute} from '@angular/router';

import { ClienteService } from '../../cliente.service';
import { Cliente} from '../../cliente-taype';
import{ClienteUpdateComponent} from '../cliente-update/cliente-update.component';

@Component({
  selector: 'app-cliente-read',
  imports: [CommonModule,TableModule,MatIconModule,RouterLink,MatDialogModule,ClienteUpdateComponent],
  templateUrl: './cliente-read.component.html',
  styleUrl: './cliente-read.component.scss'
})
export class ClienteReadComponent implements OnInit {

cliente!:Cliente[]

constructor(
  private clienteService: ClienteService,
  private dialog: MatDialog,
  private activateRoute: ActivatedRoute
) {}

ngOnInit(): void {
  this.clienteService.listarClientes().subscribe((dados) => {
    this.cliente = dados;
  });
}

editarFornecedor(id: number) {
  console.log("id clicado", id);
  this.clienteService.listarPorid(id).subscribe(cliente => {
    console.log(cliente);
    const dialogRef = this.dialog.open(ClienteUpdateComponent, {
      panelClass: 'custom-dialog',
      data: cliente,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      this.clienteService.listarClientes().subscribe(clientes => this.cliente = clientes);

      }

    });
  });
}

excluirFornecedor(id:number){
this.clienteService.deletarPorId(id).subscribe(() => {
  this.cliente = this.cliente.filter(cliente => cliente.id !== id);
})
  }

}

