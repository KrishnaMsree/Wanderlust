import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../login/userlogin';

import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  registerURL = "http://localhost:4000/user/register";

  constructor(private http: HttpClient) { }

  register(data: any): Observable<User> {
    return <Observable<User>> this.http.post(this.registerURL,data);
  }
}