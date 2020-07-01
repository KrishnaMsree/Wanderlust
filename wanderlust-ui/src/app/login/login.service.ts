import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { User } from './userlogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginURL = "http://localhost:4000/user/login";

  constructor(private http: HttpClient) { }

  login(data: any): Observable<User> {
    return <Observable<User>> this.http.post(this.loginURL,data);
  }
}
