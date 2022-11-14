import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Shared/login.service';
import { LoginUser } from '../Shared/login-user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Login :LoginUser;

  constructor(public loginService:LoginService) { 
    this.Login=new LoginUser();
  }
  ngOnInit(): void {
  }

  insertEmployee()
  {
    console.log(this.Login.userName,this.Login.password);
    this.loginService.getAuthToken(this.Login).subscribe(res=>{
            this.loginService.AuthToken=res;
            console.log(res);
          });
  }

}
