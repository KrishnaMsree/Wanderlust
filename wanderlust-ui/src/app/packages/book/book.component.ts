import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input()dealData: any;
  
  constructor() { }

  ngOnInit() {
    console.log("Deal data : ",this.dealData);
  }


}
