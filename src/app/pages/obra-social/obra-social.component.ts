import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService } from 'src/app/shared/dialogs/services/dialog.service';
import { ObraSocialFormComponent } from './components/obra-social-form/obra-social-form.component';
import { ObraSocialTableComponent } from './components/obra-social-table/obra-social-table.component';

@Component({
  selector: 'app-obra-social',
  templateUrl: './obra-social.component.html',
  styleUrls: ['./obra-social.component.scss']
})
export class ObraSocialComponent implements OnInit {

  @ViewChild(ObraSocialTableComponent) child:ObraSocialTableComponent

  constructor(
    private dialogSrv:DialogService
  ) { }

  ngOnInit(): void {
  }


  async clickAdd() {
    this.child.clickAdd()
  }
}
