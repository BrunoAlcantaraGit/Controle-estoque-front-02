
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './services/auth-guard.service';
import { HomeComponent } from './pages/home/home/home.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { SaidasComponent } from './components/saidas/saidas.component';
import { FornecedorComponent } from './components/fornecedores/componets/fornecedor/fornecedor.component';
import { FornecedorFormComponent} from './components/fornecedores/componets/fornecedor-form/fornecedor-form.component';
import { FornecedorCreateComponent } from './components/fornecedores/componets/fornecedor-create/fornecedor-create.component';
import { FornecedorReadComponent } from './components/fornecedores/componets/fornecedor-read/fornecedor-read.component';
import{ FornecedorUpdateComponent } from './components/fornecedores/componets/fornecedor-update/fornecedor-update.component';

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
  canActivate:[AuthGuard],
  children:[
    {path:"fornecedores", component:FornecedorComponent},
    {path:"create",
      component:FornecedorCreateComponent
    },
    {path:"update",
      component:FornecedorUpdateComponent
    },

    {path:"saidas",
      component:SaidasComponent},
    {path:"clientes",
      component:ClientesComponent
    },

    {path:"", redirectTo:'saidas', pathMatch:'full'},

  ]
  },

];
