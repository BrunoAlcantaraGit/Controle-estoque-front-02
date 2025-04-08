import { routes } from './../../app.routes';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { navConfig } from './navConfig';
import { naveDate } from '../navModel/navDateModel';
import { CommonModule } from '@angular/common';
import { PrimeIcons,MenuItem } from 'primeng/api';
import{MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-nav',
  imports: [RouterModule,CommonModule,MatIconModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  routes: naveDate[] = navConfig;

}
