import { Data } from "@angular/router";
import { Produto } from "../../produto/produto.type";
import { Cliente } from "../../Clientes/cliente-taype";

export interface Orcamento {
id:number,
quantidade:number,
venda:number,
compra:number,
totalDaVenda:number,
lucroTransacao:number,
data:Data,
produtos:Produto[]
produtoID: number;
cliente:Cliente
clienteID: number;
selecionado?: boolean;
}
