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

  private ulr = 'http://localhost:8181/produtos/'


  salvar(formeData: FormData): Observable<Produto> {
    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      //'Content-Type': 'application/json'
    });
    return this.HttpClient.post<any>(`${this.ulr}salvar`,formeData, { headers });
  }

  listarProdutos(): Observable<Produto[]>{
    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.HttpClient.get<Produto[]>(`${this.ulr}listar-tudo`,{headers});

  }

  editarProduto(id: number, formeData:FormData): Observable<Produto> {
    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

   return this.HttpClient.put<Produto>(`${this.ulr}atualizar/${id}`, formeData, {headers});

}


buscarProduto(id:number): Observable<Produto> {
  const token = sessionStorage.getItem('auth-token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.HttpClient.get<Produto>(`${this.ulr}buscar/${id}`,{headers});
}



}
