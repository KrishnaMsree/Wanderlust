import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PackagesComponent } from 'src/app/packages/packages.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BookComponent } from './packages/book/book.component';

const routes: Routes = [
  //to load home page
  { path: 'home', component:HomeComponent},
  { path: 'home/:userId',component:HomeComponent},


  //for login and register
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'packages', component: PackagesComponent },
  { path: 'packages/:searchValue', component: HomeComponent },
  { path: 'book', component: BookComponent },
  
  //handlers for empty path and catch all
  { path: '',component:HomeComponent },
  { path: "**",redirectTo:"",pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
