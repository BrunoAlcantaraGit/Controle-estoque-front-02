import { Injectable } from '@angular/core';
import { Fornecedor } from './fornecedor.type';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FornecedorServiceService {

  constructor(
    private http: HttpClient
  ) {}

private url = 'http://localhost:8080/fornecedores/'

  cadastrarFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {

    const token = sessionStorage.getItem('auth-token'); // Recupera o token armazenado
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'  // Define o tipo de conteúdo como JSON
    });

    return this.http.post<Fornecedor>(`${this.url}salvar`, fornecedor, {headers});
  }

}
