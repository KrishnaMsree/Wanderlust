import { Component, OnInit, Input } from '@angular/core';
import { PackagesService } from './packages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})

export class PackagesComponent implements OnInit {
  showItinerary: Boolean = false;
  hotDealsData: Array<object> = [];
  // hotDealsData;
  errorMessage: String;
  deals: any;
  name: string = "krishna";
  booked = false;
  keyword = sessionStorage.getItem('searchValue');
  constructor(private packageService: PackagesService, private route: Router) { }
  ngOnInit() { 
    this.getHotDeals();
  }

  getitinerary() {
    this.showItinerary = true;
  }
  getHotDeals(){
    console.log("Hot deals ",this.keyword);

    if(this.keyword != '' && this.keyword != null){
      console.log("inside");

      this.keyword = this.keyword.toLowerCase();
      this.packageService.getDestinations().subscribe(
      (response) => {
        let i = 0;
        for (const deal in response) {
          const continent = response[deal].continent.toLowerCase();
          // if (continent.includes(this.keyword) || des.includes(this.keyword) || name.includes(this.keyword)) {
          if (continent.includes(this.keyword)) {
            this.hotDealsData[i] = response[deal];
            i += 1;
          }
        }
        if (this.hotDealsData.length === 0) {
          this.errorMessage = "Sorry we don't operate in this Destination";
        }
      }
      );
    }
    // if(this.keyword == '')
    else if(this.keyword == '' || this.keyword == null){
      this.packageService.getHotDeals().subscribe(
        response => {
          for(const hot in response){
            this.hotDealsData[hot] = response[hot];
          }
        },
        error => {
          this.errorMessage = error.error.message;
        }
      )
    }    
  }

  onOutletLoaded(comp){
    comp.dealData = this.deals;
  }
  book(deal){
    var uName = sessionStorage.getItem('userName');
    if(uName){
      this.deals = deal;
      console.log("this.deals: ",this.deals,typeof(this.deals));
      console.log("deal: ",deal);
      this.booked = true;      
      // this.route.navigateByUrl('/book');

    }
    else{
      alert("Please Login to book a package");
      this.route.navigateByUrl('/login');
    }
  }
}

