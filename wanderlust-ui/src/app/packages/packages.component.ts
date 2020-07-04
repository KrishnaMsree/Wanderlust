import { Component, OnInit, Input } from '@angular/core';
import { PackagesService } from './packages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})

export class PackagesComponent implements OnInit {
  showItinerary = false;
  searchData: Array<object> = [];
  hotDealsData: Array<object> = [];
  errorMessage: string;
  deals: any;
  booked = false;
  keyword = sessionStorage.getItem('searchValue');
  constructor(private packageService: PackagesService, private route: Router) { }
  ngOnInit() {
    this.getHotDeals();
  }

  getitinerary() {
    this.showItinerary = true;
  }
  getHotDeals() {
    if (this.keyword !== '' && this.keyword !== null) {
      this.keyword = this.keyword.toLowerCase();
      this.packageService.getDestinations().subscribe(
      (response) => {
        let i = 0;
        for (const deal of Object.keys(response)) {
          const continent = response[deal].continent.toLowerCase();
          if (continent.includes(this.keyword)) {
            this.searchData[i] = response[deal];
            i += 1;
          }
        }
        if (this.searchData.length === 0) {
          this.errorMessage = `Sorry we don't operate in this Destination`;
        }
      }
      );
    } else if (this.keyword === '' || this.keyword === null) {
      this.packageService.getHotDeals().subscribe(
        response => {
          for (const hot of Object.keys(response)) {
            this.hotDealsData[hot] = response[hot];
          }
        },
        error => {
          this.errorMessage = error.error.message;
        }
      );
    }
  }
  book(deal) {
    this.deals = deal;
    this.booked = true;
  }
}

