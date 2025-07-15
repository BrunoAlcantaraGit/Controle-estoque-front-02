import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orcamento } from './orcamento.type';
import { environment } from '../../../environment';
@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {

baseUrl = environment.url

  constructor(
    private http: HttpClient,
  ){}

salvar(orcamento: Orcamento): Observable<Orcamento>{

  const token = sessionStorage.getItem('auth-token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.post<Orcamento>(`${this.baseUrl}/orcamento/salvar`, orcamento,{headers});

}


listar():Observable<Orcamento[]>{

  const token = sessionStorage.getItem('auth-token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
  return this.http.get<Orcamento[]>(`${this.baseUrl}/orcamento/listar`,{headers});
}


deletar(id: number): Observable<void> {
  const token = sessionStorage.getItem('auth-token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
  return this.http.delete<void>(`${this.baseUrl}/orcamento/deletar/${id}`, { headers });
}

}
