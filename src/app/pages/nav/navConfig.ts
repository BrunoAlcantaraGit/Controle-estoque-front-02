import { naveDate } from "../navModel/navDateModel";

export const navConfig: naveDate[] = [
  { title: 'Painel de saidas',
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

{ title: 'Saida de produtos',
   icon: 'pi-window-maximize',
  routeURL: 'saidas'
 },


  { title: 'Configurações',
    icon: 'pi pi-cog',
    routeURL: '0'
    },


];
