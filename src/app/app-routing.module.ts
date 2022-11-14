import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{EmployeeDetailsComponent} from "./employee-details/employee-details.component"
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
{ path: '',redirectTo: 'Login',pathMatch: 'full'},
{ path:'login',component:LoginComponent},
{ path:'signup',component:SignUpComponent},
{ path:'user',component:EmployeeDetailsComponent},
{ path: '**',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
