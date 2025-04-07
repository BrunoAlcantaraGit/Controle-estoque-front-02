
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './services/auth-guard.service';
import { HomeComponent } from './pages/home/home/home.component';
import { ClienteComponent } from './components/Clientes/components/cliente/cliente.component';
import { SaidasComponent } from './components/saidas/saidas.component';
import { FornecedorComponent } from './components/fornecedores/componets/fornecedor/fornecedor.component';
import { FornecedorFormComponent} from './components/fornecedores/componets/fornecedor-form/fornecedor-form.component';
import { FornecedorCreateComponent } from './components/fornecedores/componets/fornecedor-create/fornecedor-create.component';
import { FornecedorReadComponent } from './components/fornecedores/componets/fornecedor-read/fornecedor-read.component';
import{ FornecedorUpdateComponent } from './components/fornecedores/componets/fornecedor-update/fornecedor-update.component';
import { ClienteCreateComponent} from './components/Clientes/components/cliente-create/cliente-create.component';
import{ ClienteUpdateComponent } from './components/Clientes/components/cliente-update/cliente-update.component';

export const routes: Routes = [

  {path:'', redirectTo:'/login', pathMatch:'full'},

  {path:"login",component:LoginComponent},

  {path:"singup",component:RegisterComponent},

  {path:"home",
    component:HomeComponent,
  canActivate:[AuthGuard],
  children:[
    {path:"fornecedores", component:FornecedorComponent},
    {path:"create", component:FornecedorCreateComponent},
    {path:"update/:id", component:FornecedorUpdateComponent},

    {path:"saidas",component:SaidasComponent},

    {path:"clientes",component:ClienteComponent},
    {path:"clientes-update/:id",component:ClienteUpdateComponent},
    {path:"clientes-create",component:ClienteCreateComponent},



    {path:"", redirectTo:'saidas', pathMatch:'full'},

  ]
  },

];
