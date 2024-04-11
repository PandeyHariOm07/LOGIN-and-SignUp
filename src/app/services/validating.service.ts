import { Injectable } from '@angular/core';
import { signup } from '../models/signup';
import { HttpClient,HttpClientModule  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class ValidatingService {
signUp: signup[] | undefined;
  constructor(private http: HttpClient) { }

  SignUp(firstname: string, lastname: string, email:string,username:string, password: string):Observable<boolean> {
    var user: signup;
    user = {firstname:firstname,lastname:lastname,email:email,username:username,password:password};
    return this.http.post<boolean>('https://localhost:44363/SignUp',user);
  }

  login(username: string, password:string):Observable<boolean>{
    var user: login;
    user = {username : username , password : password };
    return this.http.post<boolean>('https://localhost:44363/Login',user);
  }
}
