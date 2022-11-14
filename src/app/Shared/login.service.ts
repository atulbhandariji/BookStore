import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from './login-user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private myhttp:HttpClient) { }

  loginURL:string='http://localhost:5129/api/Authenticate';
  loginData:LoginUser=new LoginUser();//for post data /imsert data
  AuthToken:string;

  getAuthToken(login:LoginUser):Observable<string>
  {
    let getAuthURL =this.loginURL+'?userName='+login.userName+'&password='+login.password;
    return this.myhttp.get<string>(getAuthURL);
  }
}
