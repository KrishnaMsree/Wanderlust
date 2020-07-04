import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PackagesService } from './packages.service';

describe('PackagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ RouterTestingModule ],
    declarations: [PackagesService]
  }));

  // it('should be created', () => {
  //   const service: PackagesService = TestBed.get(PackagesService);
  //   expect(service).toBeTruthy();
  // });
});
