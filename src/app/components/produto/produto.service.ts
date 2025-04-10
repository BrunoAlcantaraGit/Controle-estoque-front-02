import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Produto } from './produto.type';
import{Observable} from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {


  constructor(
    private HttpClient: HttpClient
  ) {}

  private ulr = 'http://localhost:8080/produtos/'


  salvar(produto: Produto): Observable<Produto> {
    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.HttpClient.post<Produto>(this.ulr, produto,{headers})
  }

}
