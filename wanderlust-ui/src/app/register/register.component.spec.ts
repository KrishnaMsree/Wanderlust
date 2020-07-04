import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Register Form Invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('Name field validity', () => {
    let errors = {};
    let cn = component.registerForm.controls['name'];
    expect(cn.valid).toBeFalsy();

    // Email field is required
    errors = cn.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    cn.setValue('fgedhfyh');
    errors = cn.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeUndefined();

    // Set email to something correct
    cn.setValue('krishna');
    errors = cn.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
  });

  it('Email field validity', () => {
    let errors = {};
    let email = component.registerForm.controls['emailId'];
    expect(email.valid).toBeFalsy();

    // Email field is required
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    email.setValue("test@gmzil.com");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBe(undefined);

    // Set email to something correct
    email.setValue("test@example.com");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
});


  it('Contact No field validity', () => {
    let errors = {};
    let cn = component.registerForm.controls['contactNo'];
    expect(cn.valid).toBeFalsy();

    // Email field is required
    errors = cn.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    cn.setValue(9145259963);
    errors = cn.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeUndefined();

    // Set email to something correct
    cn.setValue(9856258963);
    errors = cn.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
  });

  it('password field validity', () => {
    let errors = {};
    let password = component.registerForm.controls['password'];

    // Email field is required
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    password.setValue("kri@12Sna");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBe(undefined);

    // Set email to something correct
    password.setValue("krishnA!123");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
});

it('submitting Register form', () => {
  expect(component.registerForm.valid).toBeFalsy();
  component.registerForm.controls['contactNo'].setValue(9658965896);
  component.registerForm.controls['password'].setValue("Krishn@23");
  component.registerForm.controls['name'].setValue("Krishna");
  component.registerForm.controls['emailId'].setValue("krishna@gmail.com");
  expect(component.registerForm.valid).toBe(true);
});


  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
