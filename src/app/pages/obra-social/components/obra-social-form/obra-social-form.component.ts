import { ThrowStmt } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorHandler } from '@core/handlers/error';
import { ObraSocial } from '@core/interfaces/ObraSocial';
import { DialogData } from 'src/app/pages/user/components/user-form/user-form.component';
import { SwalService } from 'src/app/shared/dialogs/swal.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ObraSocialService } from 'src/app/shared/services/obra-social.service';

@Component({
  selector: 'app-obra-social-form',
  templateUrl: './obra-social-form.component.html',
  styleUrls: ['./obra-social-form.component.scss']
})
export class ObraSocialFormComponent implements OnInit {

  createMode: boolean = false;
  obraSocial: ObraSocial;
  obraSocialForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private obraSocialSrv: ObraSocialService,
    private dialogRef: MatDialogRef<ObraSocialFormComponent>,
    private errorHandler: ErrorHandler,
    private swalSrv:SwalService
  ) {
    const { createMode, obraSocial } = data;
    this.createMode = createMode;
    if (obraSocial) this.obraSocial = obraSocial

    this.obraSocialForm = this.formBuilder.group({
      id: new FormControl(null),
      nombre: new FormControl('',[Validators.required]),
      coseguro: new FormControl(false)
    })
    if (!this.createMode) {
      this.obraSocialForm.patchValue(this.obraSocial)
    }
 
  }

  ngOnInit(): void {
  }


  async submit() {
    let obraSocial: ObraSocial = this.obraSocialForm.value;
    obraSocial.nombre = obraSocial.nombre.toUpperCase();
    try {            
      const response = (this.createMode ? await this.obraSocialSrv.create(obraSocial) :
                                          await this.obraSocialSrv.update(obraSocial.id,obraSocial));
      if (response) {
        this.swalSrv.swalSuccess()
        this.onClose(true)
      } else {
        throw new Error("No se pudo completar la operacion");        
      }
    } catch (err) {
      this.onClose(false)
      this.errorHandler.handler(err)
    }
  }


  onClose(state) {
    this.dialogRef.close(state)
  }

}
