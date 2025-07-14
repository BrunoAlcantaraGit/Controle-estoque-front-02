import { Component, Input, Output, EventEmitter, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';


import { FloatLabelModule } from 'primeng/floatlabel';
import { SplitterModule } from 'primeng/splitter';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import{MatSelectModule} from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject,Optional } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';





import { Produto } from '../../produto/produto.type';
import { OrcamentoReadComponent } from './../orcamento/orcamento-read/orcamento-read.component';
import { OrcamentoFormComponent } from './../orcamento/orcamento-form/orcamento-form.component';
import { ProdutoService } from '../../produto/produto.service';

@Component({
  selector: 'app-vendas-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FloatLabelModule,
    SplitterModule,
    DropdownModule,
    AutoCompleteModule,
    MatSelectModule,
    OrcamentoReadComponent,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    
],
  templateUrl: './vendas-form.component.html',
  styleUrls: ['./vendas-form.component.scss']
})
export class VendasFormComponent implements OnInit {

  @Input() text = "Salvar";
  @Input() cancel = "Cancelar";
  @Input() produtos?: Produto[];


  @Output() envio = new EventEmitter();
  form!: FormGroup;
  filterCliente: string = '';
  formData!: FormData
  produto!: Produto
  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private produtoService: ProdutoService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any = null,
    @Optional() private dialogRef?: MatDialogRef<VendasFormComponent>,

  ) {}

  ngOnInit(): void {

    this.criarFormulario();

    if (this.data) {
      this.produto = this.data;
    }

  }


criarFormulario(): void {}

openSaidaForm(id:number) {

  this.produtoService.buscarProduto(id).subscribe(produto => {
        const dialogRef = this.dialog.open(OrcamentoFormComponent, {
          data: produto,
          disableClose: true
        })

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
          this.produtoService.listarProdutos().subscribe(produtos => this.produtos = produtos);

          }


      })
    })
}


  enviar(): void {

  }

  cancelar(){

  }

}
