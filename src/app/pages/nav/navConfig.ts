import { naveDate } from "../navModel/navDateModel";

export const navConfig: naveDate[] = [
  { title: 'Gráfico de movimentações',
    icon: 'pi-wave-pulse',
    routeURL: 'painel' },

  { title: 'Fornecedores',
     icon: 'pi-truck',
     routeURL: 'fornecedores' },

  { title: 'Clientes',
     icon:'pi pi-user',
      routeURL: 'clientes' },

  { title: 'Produtos',
    icon: 'pi-shopping-bag',
     routeURL: 'produtos' },

{ title: 'Orçamentos',
   icon: 'pi-window-maximize',
  routeURL: 'orcamento'
 },

{ title: 'Vendas',
   icon: 'pi-window-maximize',
  routeURL: 'vendas'
 },


  { title: 'Configurações',
    icon: 'pi pi-cog',
    routeURL: '0'
    },


];
