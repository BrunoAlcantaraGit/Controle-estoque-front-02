import { Produto } from './../../produto.type';
import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Router } from '@angular/router';
import { SplitterModule } from 'primeng/splitter';
import { InputMaskModule } from 'primeng/inputmask';
import{FileUploadModule } from 'primeng/fileupload';
import { HttpClient } from '@angular/common/http';
import { ProdutoService } from '../../produto.service';
import { HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-produto-form',
  imports: [CommonModule,ReactiveFormsModule,SplitterModule,
    InputMaskModule,FloatLabelModule,FormsModule,FileUploadModule,
    DatePipe],
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.scss'
})
export class ProdutoFormComponent implements OnInit{

  @Output () cancelarEnvio = new EventEmitter()
  @Input() text = "Salvar"
  @Input() cancel = "Cancelar"
  @Input() value=""


  imagemSelecionada: File | null = null;
  mensagemErro: string = '';
  imagemPreview: string | ArrayBuffer | null = null;

  form!: FormGroup
  produto!: Produto

constructor(

  private formBuilder:FormBuilder,
  private router:Router,
  private http:HttpClient,
  private produtoService:ProdutoService,
  private toastrService:ToastrService

){}

ngOnInit(): void {
this.creteForme()

}


onFileSelect(event: any): void {
  const file = event.files[0];
  if (file) {
    this.imagemSelecionada = file;
  }
}



creteForme():void{
  this.form = this.formBuilder.group({
    descricao: [this.produto?this.produto.descricao:""],
    quantidade:[this.produto?this.produto.quantidade:"" ],
    valorDaUnidade:[this.produto?this.produto.valorDaUnidade:""],
    valorDeCompra:[this.produto?this.produto.valorDeCompra:""],
    marca:[this.produto?this.produto.marca:""],
    codigo:[this.produto?this.produto.codigo:""],
    imagem:[this.produto?this.produto.imagem:""]
  })
}

enviar(){
  console.log(this.form.value);

  const formData: FormData = new FormData();
  const formValue = this.form.value;
  const datePipe = new DatePipe('pt-BR');
  formValue.dataCadastro = datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm');

  formData.append('descricao', formValue.descricao);
  formData.append('quantidade', formValue.quantidade);
  formData.append('valorDeCompra', formValue.valorDeCompra);
  formData.append('valorDaUnidade', formValue.valorDaUnidade);
  formData.append('marca', formValue.marca);
  formData.append('codigo', formValue.codigo);
  formData.append('dataCadastro', formValue.dataCadastro);

  if (this.imagemSelecionada) {
    formData.append('imagem', this.imagemSelecionada);
  }

 this.produtoService.salvar(formData).subscribe({
    next: res => {
      this.toastrService.success('Produto cadastrado com sucesso!', 'Sucesso');
      this.router.navigate(['home/produtos']);

    },

    error: err => this.toastrService.error('Produto ja cadastrado, verifique o código do produto')
  })

}
cancelar(){
  this.router.navigate(['home/produtos'])
}
}
