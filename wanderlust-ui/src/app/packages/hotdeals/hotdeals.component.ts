import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Routes, Router, ActivatedRoute } from '@angular/router';
import { PackagesService } from '../packages.service';

@Component({
  selector: 'app-hotdeals',
  templateUrl: './hotdeals.component.html',
  styleUrls: ['./hotdeals.component.css']
})
export class HotdealsComponent implements OnInit {

  hotDealsData: Array<object> = [];
  errorMessage: string;
  endDate;
  chargesMessage: number;
  successMessage: string;
  bookForm: FormGroup;

  deals: any;
  display = false;
  booked = false;
  // errorMessage: string;
  constructor(private fb: FormBuilder, private packageService: PackagesService, private route: Router) { }

  ngOnInit() {
    this.hotdeals();
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
  cancelBooking() {
    this.route.navigateByUrl('/home');
    setTimeout(() => {window.location.reload(); }, 500);
  }
  hotdeals() {
    this.errorMessage = null;
    this.packageService.getHotDeals().subscribe(
      response => {
        for (const hot of Object.keys(response)) {
          this.hotDealsData[hot] = response[hot];
        }
      },
      error => {
        this.errorMessage = error.error.message;
      }
    );
  }
  book(deal) {
    this.deals = deal;
    this.booked = true;
    this.showDialog();
  }
  bookTrip() {
    const uName = sessionStorage.getItem('userName');
    if (uName) {
      this.successMessage = this.errorMessage = this.chargesMessage = null;
      const num = sessionStorage.getItem('contactNo');
      this.packageService.bookTrip(this.deals.destinationId, num, this.bookForm.value).subscribe(
        response => {
          this.successMessage = response['message'];
          this.showDialog();
          setTimeout(() => {
            this.route.navigateByUrl('/home');
          }, 1500);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        },
        error => {
          this.errorMessage = error.error.message;
          this.showDialog();
        }
      );

    } else {
      alert('Please Login to book a package');
      this.route.navigateByUrl('/login');
    }
  }
  calculateCharges() {
    this.successMessage = this.errorMessage = this.chargesMessage = null;
    this.endDate = new Date();
    const givenDate = new Date(this.bookForm.value.date);
    this.endDate.setDate(givenDate.getDate() + this.deals.noOfNights);
    if (this.bookForm.value.switch) {
      this.chargesMessage = (this.deals.chargesPerPerson * this.bookForm.value.noOfPersons) -
      (this.deals.chargesPerPerson * this.bookForm.value.noOfPersons * (this.deals.discount / 100)) + this.deals.flightCharges;
    } else {
      this.chargesMessage = (this.deals.chargesPerPerson * this.bookForm.value.noOfPersons) -
      (this.deals.chargesPerPerson * this.bookForm.value.noOfPersons * (this.deals.discount / 100));
    }
  }
  customDate(c: FormControl) {
    const date = new Date(c.value).toLocaleDateString();
    const today = new Date().toLocaleDateString();
    return  date > today ? null : {
        dateError: {
            message: 'Start date should be later than today'
        }
    };
  }

}
