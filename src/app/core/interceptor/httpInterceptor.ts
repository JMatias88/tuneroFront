import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators'
import { LoadingService } from 'src/app/shared/services/loading.service';
import { AuthService } from '@core/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';


/**
 * This class is for intercepting http requests. When a request starts, we set the loadingSub property
 * in the LoadingService to true. Once the request completes and we have a response, set the loadingSub
 * property to false. If an error occurs while servicing the request, set the loadingSub property to false.
 * @class {HttpRequestInterceptor}
 */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private _loading: LoadingService,
    private notificationSrv: NotificationService,
    private authService: AuthService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loading.changeState(true);
    console.log('loading')
    return next.handle(request)
      .pipe(catchError((err) => {
        this._loading.changeState(false);
        if (err.status === 401 && !window.location.href.includes('/login')) {                
          this.notificationSrv.showError("Accion no autorizada")
          this.authService.logout();
          location.reload();
      }
      
      const error = err.error.error || err.error.message || err.statusText;
      return throwError(err.error);
      }))
      .pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          this._loading.changeState(false);
        }
        return evt;
      }));
  }
}