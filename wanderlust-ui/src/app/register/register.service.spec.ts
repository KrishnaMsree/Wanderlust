import { Location } from "@angular/common";
import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { Router } from "@angular/router";
import { AppRoutingModule } from '../app-routing.module'
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterService } from './register.service';

describe('RegisterService', () => {
  let location: Location;
  let router: Router;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, AppRoutingModule],
    declarations: [RegisterService]
  }));

  // it('should be created', () => {
  //   const service: RegisterService = TestBed.get(RegisterService);
  //   expect(service).toBeTruthy();
  // });

  // it('navigate to "" redirects you to /home', fakeAsync(() => {
  //   router.navigateByUrl('').then(() => {
  //     expect(location.path()).toBe("/home");
  //   });
  // }));

  // it('navigate to "search" takes you to /search', fakeAsync(() => {
  //   router.navigate(["/search"]).then(() => {
  //     expect(location.path()).toBe("/search");
  //   });
  // }));
});
