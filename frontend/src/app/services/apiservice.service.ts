import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User, Customer } from '../app.component';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class APIserviceService {

  serverUrl = environment.serverUrl;  // localhost:3000/

  private TOKEN_KEY = 'token'

   decodedToken: { [key: string]: string; } | undefined

  setToken(value:string){
    localStorage.setItem(this.TOKEN_KEY,value)
  }

  getToken(): string{
    return localStorage.getItem(this.TOKEN_KEY)||'';
  }

  deleteToken(){
    localStorage.removeItem(this.TOKEN_KEY);
  }

  addCustomer(customer: Customer){
    return this.POST<Customer>('customers', customer)
  }

  getCustomers(): Observable<Array<Customer>>{
    return this.GET<Array<Customer>>('customers')
  }

  getOneCustomer(id:string):Observable <Customer>{
    return this.GET<Customer>(`customers/${id}`)
  }

  // need to do the edit customer
  editCustomer(id:string, customer:Customer):Observable <Customer>{
    return this.http.put<Customer>(
      `${this.serverUrl}customers/${id}`,
      customer,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': this.getToken()
        }
      }
    )
  }

  deleteCustomer(id:string): Observable<Customer>{
    return this.http.delete<Customer>(
      `${this.serverUrl}customers/${id}`,
      {
        headers:{
          'x-auth-token': this.getToken()
        }
      }
    )
  }

  constructor(private http:HttpClient) {  }

  GET<DynamicType>(endpoint:string):Observable<DynamicType>{
    return this.http.get<DynamicType>(
      `${this.serverUrl}${endpoint}`,
      {
        headers:{
          'x-auth-token': this.getToken()
        }
      }
    )
  }
   
  POST<DynamicType>(endpoint:string, data:DynamicType): Observable<DynamicType>{
  return this.http.post<DynamicType>(
    `${this.serverUrl}${endpoint}`,
    data,
    {
      headers: {
      'Content-Type': 'application/json',
      'x-auth-token': this.getToken()
      }
    }
  )
}

login(user: User):Observable<User>{
  return this.POST<User>('users/login', user)
}

decode_token(){
  if(this.getToken()){
  this.decodedToken = jwt_decode(this.getToken())
  return this.decodedToken
  }else{
    return
  }
 }

 getEmailId() {
      this.decode_token();
      return this.decodedToken ? this.decodedToken['email'] : null;
    }
}

