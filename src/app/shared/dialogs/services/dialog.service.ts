import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog:MatDialog
  ) { }


  async openDialog(data,component) {
    const dialogRef = this.dialog.open(component, {
      width:'250px',
      disableClose: true,
      backdropClass: 'backdrop-class',
      panelClass: 'panel-class',
      data
    })
   return await lastValueFrom(dialogRef.afterClosed())
  }

}
