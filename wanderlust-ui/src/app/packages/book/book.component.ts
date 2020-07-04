import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Routes, Router, ActivatedRoute } from '@angular/router';
import { PackagesService } from '../packages.service';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input()dealData: any;
  // dealData: any;
  errorMessage: string;
  endDate;
  chargesMessage: number;
  successMessage: string;
  bookForm: FormGroup;
  display = false;

  constructor(private fb: FormBuilder, private router: Router, private packageService: PackagesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.successMessage = this.errorMessage = this.chargesMessage = null;
    this.bookForm = this.fb.group({
      noOfPersons: ['', [ Validators.required, Validators.min(1), Validators.max(5)]],
      date: ['', [Validators.required, this.customDate]],
      switch: ['']
      });
  }
  showDialog() {
      this.display = true;
  }
  bookTrip(dId) {
    const uName = sessionStorage.getItem('userName');
    if (uName) {
      this.successMessage = this.errorMessage = this.chargesMessage = null;
      const num = sessionStorage.getItem('contactNo');
      this.packageService.bookTrip(dId, num, this.bookForm.value).subscribe(
        response => {
          this.successMessage = response['message'];
          this.showDialog();
          // setTimeout(() => {
          //   this.router.navigateByUrl('/home');
          // }, 1500);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 500);
        },
        error => {
          this.errorMessage = error.error.message;
          this.showDialog();
        }
      );

    }
    else {
      alert('Please Login to book a package');
      this.router.navigateByUrl('/login');
    }
  }
  cancelBooking() {
    this.router.navigateByUrl('/home');
    setTimeout(() => {window.location.reload(); }, 500);
  }
  calculateCharges() {
    this.successMessage = this.errorMessage = this.chargesMessage = null;
    this.endDate = new Date();
    const givenDate = new Date(this.bookForm.value.date);
    const date = new Date(this.bookForm.value.date).toLocaleDateString();
    const today = new Date().toLocaleDateString();
    this.endDate.setDate(givenDate.getDate() + this.dealData.noOfNights);
    if (this.bookForm.value.switch) {
      this.chargesMessage = (this.dealData.chargesPerPerson * this.bookForm.value.noOfPersons) -
      (this.dealData.chargesPerPerson * this.bookForm.value.noOfPersons * (this.dealData.discount / 100)) + this.dealData.flightCharges;
    }else {
      this.chargesMessage = (this.dealData.chargesPerPerson * this.bookForm.value.noOfPersons) -
      (this.dealData.chargesPerPerson * this.bookForm.value.noOfPersons * (this.dealData.discount / 100));
    }
  }
  customDate(c: FormControl) {
    const date = new Date(c.value);
    const today = new Date();
    if (date.getFullYear() < today.getFullYear()) {
      return {dateError: {
        message: 'Start date should be later than today'
      }}
    } else if (date.getFullYear() === today.getFullYear()) {
      if (date.getMonth() > today.getMonth()) {
        return null;

      }else if (date.getMonth() === today.getMonth()) {
        if (date.getDate() > today.getDate()) {
          return null;
        } else {
          return { dateError: {
            message: 'Start date should be later than today'
          }}
        }
      } else {
        return { dateError: {
          message: 'Start date should be later than today'
        }}
      }
    } else {
      return null;
    }
  }
}
