import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Saida } from './orcamento.type';
import { environment } from '../../../environment';
@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {

baseUrl = environment.url

  constructor(
    private http: HttpClient,
  ){}

registrarSaida(saida: Saida): Observable<Saida>{

  const token = sessionStorage.getItem('auth-token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.post<Saida>(`${this.baseUrl}/saidas/salvar`, saida,{headers});

}


listar():Observable<Saida[]>{

  const token = sessionStorage.getItem('auth-token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
  return this.http.get<Saida[]>(`${this.baseUrl}/saidas/listar`,{headers});
}

}
