import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  hotDealsURL = 'http://localhost:4000/user/hotDeals';
  destinationsURL = 'http://localhost:4000/user/destinations';
  bookTripUrl = 'http://localhost:4000/user/bookTrip';
  userDataUrl = 'http://localhost:4000/user/userData/';
  deleteUrl = 'http://localhost:4000/user/removeTrip/';
  constructor(private http: HttpClient) { }

  getHotDeals()  {
    return  this.http.get(this.hotDealsURL);
  }
  getDestinations() {
    return  this.http.get(this.destinationsURL);
  }
  bookTrip(destId, num, form) {
    return  this.http.put(this.bookTripUrl + '/' + num + '/' + destId, form);
  }
  getUserData(id) {
    return this.http.get(this.userDataUrl + id);
  }
  removeTrip(userId, dId) {
    return this.http.delete(this.deleteUrl + dId + '/' + userId);
  }
}
