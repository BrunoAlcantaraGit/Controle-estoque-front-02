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




@Component({
  selector: 'app-produto-form',
  imports: [CommonModule,ReactiveFormsModule,SplitterModule,InputMaskModule,FloatLabelModule,FormsModule,FileUploadModule],
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.scss'
})
export class ProdutoFormComponent implements OnInit{
  @Output () envio = new EventEmitter()
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
  private roter:Router,
  private http:HttpClient,
  private produtoService:ProdutoService


){}

ngOnInit(): void {
this.creteForme()

}

onUpload(event: any) {
  const file = event.files[0];
  this.imagemSelecionada = file;

  const reader = new FileReader();
  reader.onload = () => {
    this.imagemPreview = reader.result;
  };
  reader.readAsDataURL(file);
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

  formData.append('descricao', formValue.descricao);
  formData.append('quantidade', formValue.quantidade);
  formData.append('valorDeCompra', formValue.valorDeCompra);
  formData.append('valorDaUnidade', formValue.valorDaUnidade);
  formData.append('marca', formValue.marca);
  formData.append('codigo', formValue.codigo);

  if (this.imagemSelecionada) {
    formData.append('imagem', this.imagemSelecionada);
  }

  const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.post('http://localhost:8080/produtos/salvar', formData,{headers}).subscribe({
    next: () => console.log('Produto enviado com sucesso'),
    error: err => console.error('Erro ao enviar produto', err)
  })

}

cancelar(){}
}
