import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-error-toastr',
  templateUrl: './error-toastr.component.html',
  styleUrls: ['./error-toastr.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('inactive', style({ opacity: 0 })),
      state('active', style({ opacity: 1 })),
      state('removed', style({ opacity: 0 })),
      transition(
        'inactive => active',
        animate('{{ easeTime }}ms {{ easing }}')
      ),
      transition(
        'active => removed',
        animate('{{ easeTime }}ms {{ easing }}')
      )
    ])
  ],
  preserveWhitespaces: false
})
export class ErrorToastrComponent extends Toast {
  mensaje:string
  constructor(
    protected toastrService: ToastrService,
    public toastPackage: ToastPackage,
    private notificationService:NotificationService,
  ) {
    super(toastrService, toastPackage);
    this.mensaje = this.notificationService.mensaje
  }
}
