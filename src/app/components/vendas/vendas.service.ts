import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Header } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class VendasService {

  constructor(
    private http: HttpClient,
    private headerService: Header
){}
  private url = 'http://localhost:8181/vendas/'

}
