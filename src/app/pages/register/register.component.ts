import { LoginService } from './../../services/login.service';
import { Component } from '@angular/core';
import { DefaultLoginComponent } from '../../components/default-login/default-login.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [
    DefaultLoginComponent,
    PrimaryInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  sinupForm !: FormGroup
constructor(
  private formBuilder:FormBuilder,
  private loginService:LoginService,
  private toastService: ToastrService,
  private router:Router
){
  this.sinupForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.email]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.email]),
    confimPassword: new FormControl('', [Validators.required, Validators.email])

  })
}

enviar(){

  if(this.sinupForm.value.password == this.sinupForm.value.confimPassword){
    this.loginService.register(this.sinupForm.value.name, this.sinupForm.value.email, this.sinupForm.value.password).subscribe({
      next:(value) => this.toastService.success("Usuário registraro com sucesso"), //ngx-toastr
      error:(error) => this.toastService.error("Dados inválidos, verifique os dados informados"),
    });
    this.router.navigate(['login']);
  }else{
    this.toastService.error("A confirmação da senha nao corresponde a senha informada")
}



}

navegate(){
  this.router.navigate(['login']);
}

}
