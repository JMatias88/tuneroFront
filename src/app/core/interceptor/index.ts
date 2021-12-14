import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorInterceptor } from "./ErrorInterceptor";
import { HttpRequestInterceptor } from "./httpInterceptor";
import { JwtInterceptor } from "./JwtInterceptor";

// export const errorInterceptorProvider = { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true };
// export const jwtInterceptorProvider = { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true };

export const interceptorProviders = 
   [
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi:true}
];