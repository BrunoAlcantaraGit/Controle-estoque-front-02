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





@Component({
  selector: 'app-produto-form',
  imports: [CommonModule,ReactiveFormsModule,SplitterModule,
    InputMaskModule,FloatLabelModule,FormsModule,FileUploadModule,
    DatePipe],
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.scss'
})
export class ProdutoFormComponent implements OnInit{
  @Output() eventEnvio = new EventEmitter<FormData>()
  @Output () cancelarEnvio = new EventEmitter()
  @Input() text = "Salvar"
  @Input() cancel = "Cancelar"
  @Input() value=""
  @Input() formdata?: FormData
  @Input() produto?:Produto


  imagemSelecionada: File | null = null;
  mensagemErro: string = '';
  imagemPreview: string | ArrayBuffer | null = null;

  form!: FormGroup


constructor(

  private formBuilder:FormBuilder,
  private router:Router,
  private http:HttpClient,
  private produtoService:ProdutoService,


){}

ngOnInit(): void {
this.creteForme();

if (this.produto) {
  const { imagem, ...rest } = this.produto; // Remover imagem
  this.form.patchValue(rest);
  this.marcarCamposComoTocados(this.form);
}
}



marcarCamposComoTocados(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(campo => {
    const controle = formGroup.get(campo);

    if (controle instanceof FormGroup) {
      this.marcarCamposComoTocados(controle);
    } else {
      controle?.markAsTouched();
      controle?.markAsDirty();
      controle?.updateValueAndValidity();
    }
  });
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
  } else if (this.produto?.imagem) {

    formData.append('imagem', this.produto.imagem);
  }

  this.eventEnvio.emit(formData);

}
cancelar(){
  this.cancelarEnvio.emit(this.router.navigate(['home/produtos']));
}


}
