import { Data } from "@angular/router";
import { Produto } from "../../produto/produto.type";
import { Cliente } from "../../Clientes/cliente-taype";

export interface Saida{
id:number,
quantidade:number,
venda:number,
compra:number,
totalDaVenda:number,
lucroTransacao:number,
data:Data,
produto:Produto
cliente:Cliente
selecionado?: boolean;
}
