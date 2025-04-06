import { Injectable } from '@angular/core';
import { Fornecedor } from './fornecedor.type';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endereco } from './fornecedor.type';

@Injectable({
  providedIn: 'root'
})
export class FornecedorServiceService {

  constructor(
    private http: HttpClient
  ) {}

private url = 'http://localhost:8080/fornecedores/'
private url2 = "http://localhost:8080/endereco/"


  cadastrarFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {

    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Fornecedor>(`${this.url}salvar`, fornecedor,{headers});
  }


  listarFornecedores(): Observable<Fornecedor[]> {

    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  return this.http.get<Fornecedor[]>(`${this.url}listartudo`,{headers});
}



buscarEndereco(cep:string){

    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });


  return this.http.get<Endereco>(`${this.url2}endereco-api/${cep}`,{headers});
}


listarPorId(id: number): Observable<Fornecedor> {
  const token = sessionStorage.getItem('auth-token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.get<Fornecedor>(`${this.url}listar/${id}`,{headers});
}

atualizarFornecedor(id:number, fornecedor: Fornecedor):Observable<Fornecedor>{

  const token = sessionStorage.getItem('auth-token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

return this.http.put<Fornecedor>(`${this.url}atualizar/${id}`, fornecedor,{headers});
}


deletarPorId(id: number): Observable<void> {
  const token = sessionStorage.getItem('auth-token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
  return this.http.delete<void>(`${this.url}deletar/${id}`,{headers});

}

}
