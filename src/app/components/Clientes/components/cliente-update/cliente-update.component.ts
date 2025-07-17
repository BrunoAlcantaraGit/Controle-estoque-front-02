import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';

import { ClienteFormComponent } from "../cliente-form/cliente-form.component";
import { ClienteService } from '../../cliente.service';
import { Cliente } from './../../cliente-taype';

@Component({
  selector: 'app-cliente-update',
  imports: [ClienteFormComponent],
  templateUrl: './cliente-update.component.html',
  styleUrl: './cliente-update.component.scss'
})
export class ClienteUpdateComponent implements OnInit {

  cliente!: Cliente

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private clienteService: ClienteService,
    private toastrService: ToastrService,
    private dialogRef: MatDialogRef<ClienteUpdateComponent>,
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.cliente = this.data;
    }
  }

  atualizarCliente(Cliente: Cliente) {
    this.clienteService.editarCliente(this.cliente.id, Cliente).subscribe(cliente => {

    })
    this.toastrService.success('Fornecedor atualizado com sucesso!');
    this.dialogRef.close();
    window.location.reload();

  }

  fechar() {
    this.dialogRef.close();
    this.router.navigate(['home/clientes']);
  }

}
