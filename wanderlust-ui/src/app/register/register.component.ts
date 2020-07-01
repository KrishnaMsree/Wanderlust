import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Routes, Router } from '@angular/router';
import { Location } from '@angular/common';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  registerForm: FormGroup;
  loginPage=false;

  constructor(private location: Location,private fb: FormBuilder, private registerService: RegisterService, private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0)
    //form is created on page load
    this.registerForm = this.fb.group({
    name: ['', [ Validators.required,Validators.pattern('^[A-Za-z]+[A-Za-z ]?[A-Za-z]$')]],
    emailId: ['',[ Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+(.com)$')]],
    contactNo: ['',[ Validators.required,Validators.pattern('^[6-9][0-9]{9}$')]],
    password: ['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,20}')]]
    });
  }

  
  register() {
    this.errorMessage = this.successMessage = null;
    this.registerService.register(this.registerForm.value).subscribe(
      (response) => {
          this.successMessage = response.message;
          // var userId=response.userId;
          // window.location.reload();
          //user should be navigated to home page on successful login
          setTimeout(()=>{
            this.router.navigateByUrl('/login');
          },3000);
          
          
      },
      (errorResponse) => {
        //error message if invalid contact number or password
          this.errorMessage = errorResponse.error.message;
          //clears the session storage when there is any error during login
          sessionStorage.clear();
      }
    );
}
  getLoginPage(){
    this.loginPage=true;
    //open register page if the user is not registered already
    this.router.navigateByUrl('/login');
  }
}





