import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


import{environment} from '../../environment'
import { Venda } from './venta.type';

@Injectable({
  providedIn: 'root'
})
export class VendasService {

  constructor(
    private http: HttpClient,){
    }
  private baseUrl = environment.url
  private url = `${this.baseUrl}/venda/`


  salvar(venda: Venda): Observable<Venda> {
    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.url}salvar`, venda, { headers });
  } 

}
