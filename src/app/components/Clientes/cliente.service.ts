import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Cliente,Endereco } from './cliente-taype';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http: HttpClient
  ) {}

  private url = 'http://localhost:8080/clientes/'
  private url2 = "http://localhost:8080/endereco/"

  salvar(cliente: Cliente): Observable<Cliente> {
  const token = sessionStorage.getItem('auth-token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
    return this.http.post<Cliente>(`${this.url}salvar`, cliente,{headers});
  }

buscarEnderecoAPI(cep:string): Observable<Endereco> {

  const token = sessionStorage.getItem('auth-token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
    return this.http.get<Endereco>(`${this.url2}endereco-api/${cep}`,{headers});
  }
}
