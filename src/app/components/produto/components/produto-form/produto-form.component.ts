import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Router } from '@angular/router';
import { SplitterModule } from 'primeng/splitter';
import { InputMaskModule } from 'primeng/inputmask';
import{FileUploadModule } from 'primeng/fileupload';

import { Produto } from '../../produto.type';



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
  mensagemErro: string = '';
  imagemPreview: string | ArrayBuffer | null = null;

  form!: FormGroup
  produto!: Produto

constructor(
  private router: Router,
  private formBuilder:FormBuilder,
  private roter:Router

){}

ngOnInit(): void {
this.creteForme()

}

onUpload(event: any) {
  const file: File = event.files[0];

  if (!file) return;

  const tipoValido = ['image/png', 'image/jpeg'].includes(file.type);

  if (!tipoValido) {
    this.mensagemErro = 'A imagem deve ser PNG ou JPG.';
    return;
  }

  const reader = new FileReader();
  reader.onload = (e: any) => {
    const img = new Image();
    img.onload = () => {
      if (img.width === 200 && img.height === 200) {
        this.mensagemErro = '';
        this.imagemPreview = e.target.result;
        this.form.patchValue({
          img: e.target.result
        });
      } else {
        this.mensagemErro = 'A imagem deve ter 200x200 pixels.';
        this.form.patchValue({ img: '' });
      }
    };
    img.src = e.target.result;
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
    img:[this.produto?this.produto.img:""]
  })
}

enviar(){
  this.envio.emit(this.form.value)
  console.log(this.form.value);
}


cancelar(){}
}
