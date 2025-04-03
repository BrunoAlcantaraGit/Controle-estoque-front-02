import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

constructor(
  private router:Router,
  private toastService: ToastrService
){}

 @Input() text = 'Logout';

 logout(){
  sessionStorage.removeItem('auth-token')
  this.toastService.info("Logout efetuado com sucesso")
  this.router.navigate(['login']);
 }

}
