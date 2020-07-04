import { Component, OnInit } from '@angular/core';
import { PackagesService } from '../packages/packages.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  successMessage;
  errorMessage;
  userId = sessionStorage.getItem('userId');
  constructor(private myProfileService: PackagesService) { }

  ngOnInit() {
    this.successMessage = this.errorMessage = null;
    this.myProfileService.getUserData(this.userId).subscribe(
      data => this.successMessage = data,
      error => this.errorMessage = error.error.message
    );
  }

}
