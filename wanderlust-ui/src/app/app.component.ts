import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Wanderlust';
  userLoggedIn = sessionStorage.getItem('userId');
  userName = sessionStorage.getItem('userName');
  constructor( private router: Router) {}
  ngOnInit() {
    window.scrollTo(0, 0);
  }
  confirm() {
    alert('Are you sure that you want to proceed?');
    sessionStorage.clear();
    this.router.navigateByUrl('/home');
    setTimeout(() => {
      window.location.reload();
    }, 700);
  }
  hotdeals() {
    sessionStorage.removeItem('searchValue');
  }
}
