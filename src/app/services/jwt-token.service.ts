import { Injectable } from "@angular/core";
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class JwtTokenService {

    jwtToken!: string;
    decodedToken!: { [key: string]: string };

    constructor() {
    }

    setToken(token: string) {
        if (token) {
            this.jwtToken = token;
        }
    }

    decodeToken() {
        if (this.jwtToken) {
            this.decodedToken = jwt_decode(this.jwtToken);
        }
    }

    getDecodeToken() {
        return jwt_decode(this.jwtToken);
    }

    getUser() {
        this.decodeToken();
        //@ts-ignore
        return this.decodedToken ? this.decodedToken.displayname : null;
    }

    getExpiryTime() {
        this.decodeToken();
        //@ts-ignore
        return this.decodedToken ? this.decodedToken.exp : null;
    }

    isTokenExpired(): boolean {

        const expiryTime = this.getExpiryTime();
        if (expiryTime) {
            return ((1000 * Number(expiryTime)) - (new Date()).getTime()) < 5000;
        } else {
            return false;
        }
    }

}
