import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavComponent } from '../../nav/nav.component';
import { HeaderComponent } from '../../../components/header/header.component';




@Component({
  selector: 'app-home',
  imports: [RouterModule,CommonModule,NavComponent,HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


}
