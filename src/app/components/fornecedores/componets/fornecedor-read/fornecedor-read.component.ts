
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Fornecedor } from '../../fornecedor.type';
import { FornecedorServiceService } from '../../fornecedor-service.service';


@Component({
  selector: 'app-fornecedor-read',
  imports: [TableModule],
  templateUrl: './fornecedor-read.component.html',
  styleUrl: './fornecedor-read.component.scss'
})
export class FornecedorReadComponent implements OnInit{
constructor(
  private customerService: FornecedorServiceService
) {}

fornecedores!: Fornecedor[];

ngOnInit(): void {
  this.customerService.listarFornecedores().subscribe(fornecedores => this.fornecedores = fornecedores);
}

editarFornecedor(Fornecedor:any){}

excluirFornecedor(Fornecedor:any){}

}
