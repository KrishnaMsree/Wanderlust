import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  keyword = '';
  // sessionStorage
  constructor(private route: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
  search() {
    sessionStorage.setItem('searchValue', this.keyword);
    this.route.navigateByUrl('/packages/' + this.keyword.toUpperCase());
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
}
