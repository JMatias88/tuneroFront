import { HttpInterceptor,  HttpRequest,  HttpHandler,  HttpEvent,  HTTP_INTERCEPTORS} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service'

@Injectable() 
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // add authorization header with jwt token if available    
    const currentUser = this.authService.currentUserValue;
    console.log(currentUser)
    if (currentUser && currentUser.accessToken) {
        console.log(`Bearer ${currentUser.accessToken}`)
          request = request.clone({
              setHeaders: {
                  Authorization: `Bearer ${currentUser.accessToken}`
              }
          });    
      }
    return next.handle(request)
  }
}

