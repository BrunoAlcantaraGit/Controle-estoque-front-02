import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Saida } from './saida.type';
@Injectable({
  providedIn: 'root'
})
export class SaidaService {
url = 'http://localhost:8181/saidas/'
  constructor(
    private http: HttpClient,
  ){}

registrarSaida(saida: Saida): Observable<any> {

  const token = sessionStorage.getItem('auth-token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

 return this.http.post<any>(this.url, saida);


}

}
