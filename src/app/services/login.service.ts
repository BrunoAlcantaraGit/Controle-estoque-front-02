import { Injectable } from '@angular/core'
import { HttpClient} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../types/loginResponse.type';
import{RegisterResponse} from '../types/registerResponse.type'


@Injectable({
  providedIn: 'root'
})
export class LoginService {
 url = 'http://localhost:8080/auth/';
  constructor(
    private http: HttpClient
  ) {}


  login(email: string, password: string){
   return this.http.post<LoginResponse>(`${this.url}login`,{email, password}).pipe(
  tap((value)=>{
    sessionStorage.setItem('auth-token', value.token)
    sessionStorage.setItem('username', value.name)
  }))}


register(nome:string,email: string, password: string){
return this.http.post<LoginResponse>(`${this.url}register`,{nome,email,password}).pipe(
  tap((value)=>{
    sessionStorage.setItem('auth-token', value.token)
    sessionStorage.setItem('username', value.name)
  }))

}}
