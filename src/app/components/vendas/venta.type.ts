import { Cliente } from "../Clientes/cliente-taype";

export interface Venda {
    id: number;
    clienteId: number;
    produtoIds: number[];
    orcamentoIds: number[];
    lucro: number;
    valorTotalDaVenda: number;
    
}