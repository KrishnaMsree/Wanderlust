import { Component } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Wanderlust'; 
  userLoggedIn=sessionStorage.getItem('userId');
  userName=sessionStorage.getItem('userName');
  constructor( private router: Router){}
  ngOnInit(){
    window.scrollTo(0, 0);
  }
  confirm(){
    sessionStorage.clear();
    this.router.navigateByUrl("/home")
    setTimeout(()=>{
      window.location.reload();
    },2000);
  }
  hotdeals(){
    sessionStorage.removeItem('searchValue')
  }
}
