import { Component, OnInit, ViewChild } from '@angular/core';
import { BoxesTableComponent } from './components/boxes-table/boxes-table.component';

@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.scss']
})
export class BoxesComponent implements OnInit {

  @ViewChild(BoxesTableComponent) child:BoxesTableComponent

  constructor() { }

  ngOnInit(): void {
  }


  clickAdd() {
    this.child.clickAdd()
  }

}
