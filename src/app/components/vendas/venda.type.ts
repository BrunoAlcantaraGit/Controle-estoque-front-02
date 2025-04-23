import { Data } from "@angular/router";
import { Produto } from "../produto/produto.type";
import { Cliente } from "../Clientes/cliente-taype";

export interface Venda{
id:number,
codigo:String,
UnidadeDaVenda:number,
totalDaVenda:number,
data:Data,
produtos:Produto[]
clientes:Cliente
}
