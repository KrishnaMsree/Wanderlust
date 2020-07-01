import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  hotDealsURL = "http://localhost:4000/user/hotDeals";
  destinationsURL = "http://localhost:4000/user/destinations";

  constructor(private http: HttpClient) { }

  getHotDeals()  {
    return  this.http.get(this.hotDealsURL);
  }
  getDestinations(){
    return  this.http.get(this.destinationsURL);
  }
}