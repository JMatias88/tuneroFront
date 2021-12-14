import { Component, OnInit, ViewChild } from '@angular/core';
import { PacientesTableComponent } from './components/pacientes-table/pacientes-table.component';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {

  @ViewChild(PacientesTableComponent) child:PacientesTableComponent

  constructor() { }

  ngOnInit(): void {
  }


  clickAdd() {
    this.child.clickAdd()
  }

}
