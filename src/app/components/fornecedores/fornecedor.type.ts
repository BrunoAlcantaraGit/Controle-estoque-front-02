export interface Fornecedor {
  id: number;
  nome: string;
  documento: string;
  contato: Contato;
  endereco: Endereco;
}

export interface Contato {
  id: number;
  telefone: string;
  email: string;
}

export interface Endereco {
  id: number;
  logradouro: string;
  numero: string;
  bairro: string;
  cep: string;
  estado: string;
  complemento: string;

}

