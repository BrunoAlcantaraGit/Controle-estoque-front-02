import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './services/auth-guard.service';
import { HomeComponent } from './pages/home/home/home.component';

import { ClienteComponent } from './components/Clientes/components/cliente/cliente.component';
import { ClienteCreateComponent} from './components/Clientes/components/cliente-create/cliente-create.component';
import{ ClienteUpdateComponent } from './components/Clientes/components/cliente-update/cliente-update.component';

import { FornecedorComponent } from './components/fornecedores/componets/fornecedor/fornecedor.component';
import { FornecedorCreateComponent } from './components/fornecedores/componets/fornecedor-create/fornecedor-create.component';
import{ FornecedorUpdateComponent } from './components/fornecedores/componets/fornecedor-update/fornecedor-update.component';

import { ProdutoComponent } from './components/produto/components/produto/produto.component';
import { ProdutoCreateComponent } from './components/produto/components/produto-create/produto-create.component';
import { ProdutoUpdateComponent } from './components/produto/components/produto-update/produto-update.component';

import { VendasComponent} from './components/vendas/venda/vendas.component';
import { VendasCreateComponent } from './components/vendas/vendas-create/vendas-create.component';
import { VendasUpdateComponent } from './components/vendas/vendas-update/vendas-update.component';
import { VendasFormComponent } from './components/vendas/vendas-form/vendas-form.component';

import { SaidaCreateComponent } from './components/vendas/saida/saida-create/saida-create.component';

import { PainelComponent} from './components/painel-saidas/components/painel/painel.component';
import{ PainelReadComponent } from './components/painel-saidas/components/painel-read/painel-read.component';

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

    {path:"clientes",component:ClienteComponent},
    {path:"clientes-update/:id",component:ClienteUpdateComponent},
    {path:"clientes-create",component:ClienteCreateComponent},

    {path:"produtos",component:ProdutoComponent},
    {path:"produtos-create",component:ProdutoCreateComponent},
    {path:"produtos-update/:id",component:ProdutoUpdateComponent},

    {path:"vendas",component:VendasComponent},
    {path:"vendas-create",component:VendasCreateComponent},
    {path:"vendas-update/:id",component:VendasUpdateComponent},
    {path:"vendas-form",component:VendasFormComponent},
    {path:"saidas-create",component:SaidaCreateComponent},

    {path:"painel",component:PainelComponent},
    {path:"painel-read/:id",component:PainelReadComponent},

    {path:"", redirectTo:'saidas', pathMatch:'full'},

  ]
  },

];
