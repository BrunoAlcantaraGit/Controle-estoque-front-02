import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

import{environment} from '../../environment'
@Injectable({
  providedIn: 'root'
})
export class VendasService {

  constructor(
    private http: HttpClient,){
    }
  private baseUrl = environment.url
  private url = `${this.baseUrl}/vendas/`

}
