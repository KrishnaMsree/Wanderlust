//form and http modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//ng prime and other styling modules
import {AccordionModule} from 'primeng/accordion'; 
import {MenuItem} from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import {SidebarModule} from 'primeng/sidebar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule} from 'primeng/toast';
import {CardModule} from 'primeng/card';
import {FieldsetModule} from 'primeng/fieldset';

//the components modules
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PackagesComponent } from './packages/packages.component';
import { LoginComponent } from './login/login.component';

//services
import { LoginService } from './login/login.service';

//routing
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import { BookComponent } from './packages/book/book.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PackagesComponent,
    RegisterComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AccordionModule,  
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    DialogModule,
    SidebarModule,
    ToastModule,
    CardModule,
    FieldsetModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
