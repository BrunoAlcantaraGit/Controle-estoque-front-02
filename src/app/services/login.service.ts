
import { Injectable } from '@angular/core'
import { HttpClient} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../types/loginResponse.type';
import{RegisterResponse} from '../types/registerResponse.type'
import { environment } from '../environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
private baseUrl = environment.url;

 url = `${this.baseUrl}/auth/`;
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

}
findUser(email:string){
  return this.http.get(`${this.url}findUser/${email}`)

}

}



