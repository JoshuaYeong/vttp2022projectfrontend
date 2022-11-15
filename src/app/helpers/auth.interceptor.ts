import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { catchError, Observable } from 'rxjs';
import { AppCookieService } from '../services/app-cookie.service';
import { Router } from '@angular/router';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private appCookieSvc: AppCookieService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.appCookieSvc.get("token")
        if (token != null) {
            req = req.clone({
                url: req.url,
                setHeaders: {
                    Authorization: `Bearer ${ token }`
                }
            })
        }
        return next.handle(req).pipe(
            catchError(err => {
                this.appCookieSvc.remove("username")
                this.appCookieSvc.remove("token")
                // this.router.navigate(['/'])

                throw err
            })
        )
    }
}

export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
