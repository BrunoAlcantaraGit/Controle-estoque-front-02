import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private toastService: ToastrService
  ) { }

  @Input() text = 'Sair';

  logout() {
    sessionStorage.removeItem('auth-token')
    this.toastService.info("Logout efetuado com sucesso")
    this.router.navigate(['login']);
  }

}
