import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PackagesComponent } from 'src/app/packages/packages.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BookComponent } from './packages/book/book.component';
import { HotdealsComponent } from './packages/hotdeals/hotdeals.component';
import { PlannedtripsComponent } from './plannedtrips/plannedtrips.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  // to load home page
  { path: 'home', component: HomeComponent},
  { path: 'home/:userId', component: HomeComponent},

  // for login and register
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'packages', component: PackagesComponent },
  { path: 'hotDeals', component: HotdealsComponent },
  { path: 'viewBookings', component: PlannedtripsComponent },
  { path: 'packages/:searchValue', component: PackagesComponent },
  { path: 'book', component: BookComponent },
  // handlers for empty path and catch all
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
