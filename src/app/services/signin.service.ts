
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { AppCookieService } from './app-cookie.service';
import { Router } from '@angular/router';
import { User } from '../models';

const httpOptions = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")

@Injectable({
    providedIn: 'root'
})
export class SignInService {

    constructor(private http: HttpClient, private router: Router, private appCookieSvc: AppCookieService) { }

    signin(user: User): Promise<any> {
        return firstValueFrom(
            this.http.post('/signin', user)
        )
    }

    register(user: User): Promise<any> {
        return firstValueFrom(
            this.http.post('/register', user)
        )
    }

    // signin(user: User): Observable<any> {
    //     return this.http.post('/signin', user, httpOptions)
    // }

    // register(user: User): Observable<any> {
    //     return this.http.post('/register', user, httpOptions)
    // }

    // signout(): Observable<any> {
    //     return this.http.post('/signout', {}, httpOptions)
    // }

    // getProfile(username: string) {
    //     return firstValueFrom(
    //         this.http.get<any>(`/profile/${ username }`)
    //     )
    // }

    doSignin() {
        return firstValueFrom(
            this.http.get<any>(`/profile/`)
        )
    }

    getToken() {
        return this.appCookieSvc.get("token")
    }

    isSignedIn(): boolean {
        let authToken = this.appCookieSvc.get("token")
        return authToken !== null ? true : false;
    }

    doSignOut() {
        let removeToken = this.appCookieSvc.remove('token')
        this.appCookieSvc.remove('username')
        if (removeToken == null) {
            this.router.navigate(['/'])

        }
    }

}
