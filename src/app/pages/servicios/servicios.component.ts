import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiciosService } from 'src/app/shared/services/servicios.service';
import { ServiciosTableComponent } from './components/servicios-table/servicios-table.component';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent implements OnInit {

  @ViewChild(ServiciosTableComponent) child:ServiciosTableComponent

  constructor(
  
  ) { }

  ngOnInit(): void {

  }



  clickAdd() {
    this.child.clickAdd()
  }
  
}
