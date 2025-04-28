import { Data } from "@angular/router";
import { Produto } from "../produto/produto.type";
import { Cliente } from "../Clientes/cliente-taype";

export interface Saida{
id:number,
quantidade:number,
unidadeDacompra:number,
UnidadeDaVenda:number,
totalDaVenda:number,
lucroTransacao:number,
data:Data,
produtos:Produto[]
cliente:Cliente
}
