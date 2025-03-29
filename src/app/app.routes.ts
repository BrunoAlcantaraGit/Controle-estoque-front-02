import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import{UserComponent} from './pages/user/user.component'
import { AuthGuard } from './services/auth-guard.service';

export const routes: Routes = [

  {path:'', redirectTo:'/login', pathMatch:'full'},

  {path:"login",
    component:LoginComponent
  },

  {path:"singup",
    component:RegisterComponent
  },

  {path:"user",
    component:UserComponent,
    canActivate:[AuthGuard]
  }
];
