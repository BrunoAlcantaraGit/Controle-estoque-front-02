import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './services/auth-guard.service';
import { HomeComponent } from './pages/home/home/home.component';
import { ClientesComponent } from './components/clientes/clientes.component';

export const routes: Routes = [

  {path:'', redirectTo:'/login', pathMatch:'full'},

  {path:"login",
    component:LoginComponent
  },

  {path:"singup",
    component:RegisterComponent
  },

  {path:"home",
    component:HomeComponent,
    canActivate:[AuthGuard]
  },

  {path:"clientes",
    component:ClientesComponent,
    canActivate:[AuthGuard]
  }

];
