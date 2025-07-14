export interface Venda {
    id:number
    clienteId: number;
    pordutoIds: number[];
    orcamentoIds: number[];
    lucro: number;
    valorTotalDaVenda: number;
}