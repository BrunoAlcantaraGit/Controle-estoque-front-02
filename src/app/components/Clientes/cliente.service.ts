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
    private http: HttpClient,
  ) {}

  private url = 'http://localhost:8181/clientes/'
  private url2 = "http://localhost:8181/endereco/"

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


  listarPorid(id:number): Observable<Cliente>{

    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<Cliente>(`${this.url}listar/${id}`,{headers});
  }


  listarClientes(): Observable<Cliente[]>{
    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<Cliente[]>(`${this.url}listar-clientes`,{headers});
}

deletarPorId(id: number): Observable<void> {
  const token = sessionStorage.getItem('auth-token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
  return this.http.delete<void>(`${this.url}deletar/${id}`,{headers});

}

editarCliente(id:number,cliente:Cliente):Observable<Cliente>{
  const token = sessionStorage.getItem('auth-token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.put<Cliente>(`${this.url}atualizar/${id}`, cliente,{headers});
}
}
