import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NotificationService } from "src/app/shared/services/notification.service";


@Injectable()
export class ErrorHandler  {
  constructor(private notificationSrv:NotificationService ) {}

  handler(msg: any) {
    console.log(msg)
    const { status, statusCode, message, error } = msg;
    let code = status | statusCode;
    console.log(code)
    switch (code) {
      case 0:
        const { sqlMessage } = msg;
        if (sqlMessage) {
          this.notificationSrv.showError(sqlMessage)
        } else {
          this.notificationSrv.showError('Error no handler')
        }
        break;
      case 400:
        console.log(message)
        if (typeof (message) != 'string') {
          message.forEach(element => {
            let msg = JSON.parse(element);
            console.log(msg.message)
            this.notificationSrv.showError(msg.message)
          });
        } else {
          this.notificationSrv.showError(message)
        }

        break;
      case 404:
        this.notificationSrv.showError('Error 404, servicio no implementado');
        break;
      case 502:
        this.notificationSrv.showError(message);
        break;
      default:
        this.notificationSrv.showError(msg);
        break;
    }
  }
  
}
