import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

constructor(
  private router:Router
){}

 @Input() text = 'Logout';

 logout(){
  sessionStorage.removeItem('auth-token')
  this.router.navigate(['login']);
 }

}
