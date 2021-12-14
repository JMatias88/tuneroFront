import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SuccessToastComponent,ErrorToastrComponent } from '../components/notification'


enum ToastPositionTypes {
  bottomCenter = 'toast-bottom-center',
  bottomRight = 'toast-bottom-right',
  bottomLeft = 'toast-bottom-left',
  topCenter = 'toast-top-center',
  topRight = 'toast-top-right',
  topLeft = 'toast-top-left'
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public toastrPositionTypes: typeof ToastPositionTypes = ToastPositionTypes;
  public toastrPosition: string = this.toastrPositionTypes.topRight;
  public timeOut = 3000;


  mensaje:string

  constructor(
    private toastrService: ToastrService
  ) { }


  public showSuccess(mensaje): void {
    this.mensaje = mensaje;
    this.toastrService.show(
      null,
      null,
      {
        positionClass: this.toastrPosition,
        toastComponent: SuccessToastComponent,
        timeOut: this.timeOut,
        tapToDismiss: false
      }
    );
  }

  public showError(mensaje): void {
    console.log(mensaje)
    this.mensaje = mensaje;
    this.toastrService.show(
      null,
      null,
      {
        positionClass: this.toastrPosition,
        toastComponent: ErrorToastrComponent,
      }
    );
  }


}
