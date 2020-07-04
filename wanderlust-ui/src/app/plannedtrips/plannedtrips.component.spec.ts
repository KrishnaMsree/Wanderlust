import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {DialogModule} from 'primeng/dialog';
import {CardModule} from 'primeng/card';
import {FieldsetModule} from 'primeng/fieldset';
import { PlannedtripsComponent } from './plannedtrips.component';

describe('PlannedtripsComponent', () => {
  let component: PlannedtripsComponent;
  let fixture: ComponentFixture<PlannedtripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, FieldsetModule, CardModule, DialogModule, HttpClientTestingModule ],
      declarations: [ PlannedtripsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannedtripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Popup should not be displayed', () => {
    expect(component.display).toBeFalsy();
  });
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
