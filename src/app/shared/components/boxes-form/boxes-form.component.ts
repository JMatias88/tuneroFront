import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Boxes } from '@core/interfaces/Boxes';
import { SwalService } from '../../dialogs/swal.service';
import { BoxesService } from '../../services/boxes.service';
import { ErrorHandler } from '@core/handlers/error';

@Component({
  selector: 'app-boxes-form',
  templateUrl: './boxes-form.component.html',
  styleUrls: ['./boxes-form.component.scss']
})
export class BoxesFormComponent implements OnInit {

  createMode: boolean = false;
  boxes: Boxes;
boxesForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private boxesSrv: BoxesService,
    private dialogRef: MatDialogRef<BoxesFormComponent>,
    private errorHandler: ErrorHandler,
    private swalSrv:SwalService
  ) {
    const { createMode, obraSocial } = data;
    this.createMode = createMode;
    if (obraSocial) this.boxes = obraSocial

    this.boxesForm = this.formBuilder.group({
      id: new FormControl(null),
      nombre: new FormControl('',[Validators.required]),
      descripcion: new FormControl('')
    })
    if (!this.createMode) {
      this.boxesForm.patchValue(this.boxes)
    }
 
  }

  ngOnInit(): void {
  }


  async submit() {
    let boxes: Boxes = this.boxesForm.value;
    boxes.nombre = boxes.nombre.toUpperCase();
    try {            
      const response = (this.createMode ? await this.boxesSrv.create(boxes) :
                                          await this.boxesSrv.update(boxes.id,boxes));
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
