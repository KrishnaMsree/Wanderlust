import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Routes, Router } from '@angular/router';
import { Location } from '@angular/common';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  loginForm: FormGroup;
  registerPage = false;

  constructor(private location: Location, private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    // form is created on page load
    this.loginForm = this.fb.group({
      contactNo: ['', [ Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],
      password: ['', [Validators.required]]
      });
  }

  login() {
    this.loginService.login(this.loginForm.value).subscribe(
      (response) => {
          this.errorMessage = null;
          // userdatils are stored in the sessionStorage
          sessionStorage.setItem('contactNo', response.contactNo);
          sessionStorage.setItem('userId', response.userId);
          sessionStorage.setItem('userName', response.name);
          const userId = response.userId;
          // setTimeout(()=>{
          this.router.navigateByUrl('/home' + '/' + userId);
          // },1000);
          setTimeout(() => {
            window.location.reload();
          }, 500);
      },
      (errorResponse) => {
        // error message if invalid contact number or password
          this.errorMessage = errorResponse.error.message;
          // clears the session storage when there is any error during login
          sessionStorage.clear();
      }
    );
}
  getRegisterPage() {
    this.registerPage = true;
    // open register page if the user is not registered already
    this.router.navigateByUrl('/register');
  }
}





