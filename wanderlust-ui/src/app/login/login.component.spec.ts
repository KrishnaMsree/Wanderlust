import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { LoginComponent } from './login.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('Form Invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let errors = {};
    let cn = component.loginForm.controls['contactNo'];
    expect(cn.valid).toBeFalsy();

    // Email field is required
    errors = cn.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    cn.setValue(2145259963);
    errors = cn.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    // Set email to something correct
    cn.setValue(9856258963);
    errors = cn.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
  });

  it('password field validity', () => {
    let errors = {};
    let password = component.loginForm.controls['password'];

    // Email field is required
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    password.setValue("Krishn@23");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBe(undefined);

    // Set email to something correct
    password.setValue("123456789");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
});

it('submitting a form', () => {
  expect(component.loginForm.valid).toBeFalsy();
  component.loginForm.controls['contactNo'].setValue(9658965896);
  component.loginForm.controls['password'].setValue("Krishn@23");
  expect(component.loginForm.valid).toBe(true);
});

  // it('Checking login details', () => {
  //   contactNo = fixture.debugElement.query(By.css('input[type=number]'));
  //   password = fixture.debugElement.query(By.css('input[type=password]'));
  //   contactNo.nativeElement.value = '6589658965';
  //   password.nativeElement.value = 'Abc@1234';
  //   expect(contactNo).toBe(contactNo);
  //   expect(password).toBe(password);

  // });
});
