import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AppCookieService } from "./app-cookie.service";
import { JwtTokenService } from "./jwt-token.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private jwtSvc: JwtTokenService, private appCookieSvc: AppCookieService) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<any> | Promise<any> {

        if (!!this.appCookieSvc.get("token")) {
            if (this.jwtSvc.isTokenExpired()) {
                window.alert('Access denied! Token expired!')
                this.router.navigate(['/'])
                return false
            } else {
                return true
            }
        } else {
            // window.alert('Access denied! Unable to locate Token!')
            this.router.navigate(['/'])
            return false
        }
    }

}
