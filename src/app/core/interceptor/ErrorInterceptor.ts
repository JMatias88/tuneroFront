import { Injectable } from '@angular/core';
import { HttpInterceptor,  HttpRequest,  HttpHandler,  HttpEvent,  HttpErrorResponse,  HTTP_INTERCEPTORS} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '@core/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { LoadingService } from 'src/app/shared/services/loading.service';


@Injectable()

export class ErrorInterceptor implements HttpInterceptor {  
    constructor(
        private authService: AuthService,
        private notificationSrv: NotificationService,
        private loadingSrv:LoadingService
        ) { }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
            if (err.status === 401 && !window.location.href.includes('/login')) {                
                this.notificationSrv.showError("Accion no autorizada")
                this.authService.logout();
                location.reload();
            }
            
            const error = err.error.error || err.error.message || err.statusText;
            return throwError(err.error);
        }));  
    }
}

