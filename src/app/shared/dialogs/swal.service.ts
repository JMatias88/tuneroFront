import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }



  swalSuccess(title:string="Completado",text:string="Operacion Completada Correctamente") {
    const swal = Swal.fire(
      {
        title,
        text,
        icon:'success'
      }
    )       
  }
}
