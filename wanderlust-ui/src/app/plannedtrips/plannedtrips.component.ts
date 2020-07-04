import { Component, OnInit } from '@angular/core';
import { PackagesService } from '../packages/packages.service';

@Component({
  selector: 'app-plannedtrips',
  templateUrl: './plannedtrips.component.html',
  styleUrls: ['./plannedtrips.component.css']
})
export class PlannedtripsComponent implements OnInit {

  data: any;
  destData: any;
  hotData: any;
  display = false;
  destIds: Array<object> = [];
  finalData: Array<object> = [];
  errorMessage: string;
  successMessage: string;
  errorMsg: string;
  constructor(private packageService: PackagesService) { }

  ngOnInit() {
    this.loadTrips();
  }
  showDialog() {
    this.display = true;
  }
  removeTrip(dId) {
    const userId = sessionStorage.getItem('userId');
    this.errorMessage = this.successMessage = null;
    this.packageService.removeTrip(userId, dId).subscribe(
      response => {
        this.successMessage = response['message'];
        this.showDialog();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      error => {
        this.errorMessage = error.error.message;
        this.showDialog();
      }
    );
  }

  loadTrips() {
    this.errorMessage = this.successMessage = null;
    const id = sessionStorage.getItem('userId');
    let i = 0;
    this.packageService.getUserData(id).subscribe(
      response => {
        this.data = response;
        for ( const dest of Object.keys(this.data[0].bookings)) {
          this.destIds[dest] =  this.data[0].bookings[dest].destinationId;
        }
        if (this.destIds.length > 0) {
          this.packageService.getDestinations().subscribe(
            resp => {
              this.destData = resp;
              for (const d of Object.keys(this.destIds)) {
                for (const e of Object.keys(this.destData)) {
                  if (this.destIds[d] === this.destData[e]['destinationId']) {
                    this.finalData[i] = this.destData[e];
                    i += 1;
                    break;
                  } else {
                    continue;
                  }
                }
              }
              if (this.finalData.length !== this.destIds.length) {
                this.packageService.getHotDeals().subscribe(
                  res => {
                    this.hotData = res;
                    for (const d of Object.keys(this.destIds)) {
                      for (const e of Object.keys(this.hotData)) {
                        if (this.destIds[d] === this.hotData[e]['destinationId']) {
                            this.finalData[i] = this.hotData[e];
                          i += 1;
                          break;
                        } else {
                          continue;
                        }
                      }
                    }
                  }
                );
              }
            }
          );
        } else {
            this.errorMsg = 'Sorry, You have not planned any trips with us yet!';
        }
      },
      error => this.errorMsg = error.error.message
    );
  }
}
