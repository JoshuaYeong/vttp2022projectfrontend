import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { first, firstValueFrom, Observable } from "rxjs";
import { Flat, Search } from "../models";
import { AppCookieService } from "./app-cookie.service";

const httpOptions = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')

@Injectable()
export class SearchService {

    constructor(private http: HttpClient, private appCookieSvc: AppCookieService) { }

    // doSearch(search: Search) {

    //     console.log(':::::Execute Search')

    //     return firstValueFrom(
    //         this.http.post<any>("/search", search)
    //     )
    // }

    getResults(username: string, query: Search["query"], limit: Search["limit"]): Promise<any> {

        const params = new HttpParams()
            .set('query', query)
            .set('limit', limit)

        // console.log(':::::Get Results')

        return firstValueFrom(
            this.http.get<any>(`/results/${ username }`, { params: params })
        )
    }

    doSave(username: string, flatArr: Flat[]) {

        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        // console.log(':::::Execute Save')

        return firstValueFrom(
            this.http.post<Flat[]>(`/favourites/${ username }`, flatArr, { headers })
        )

    }

    getFavourites(username: string): Promise<Flat[]> {

        // console.log(':::::Get Favourites')

        return firstValueFrom(
            this.http.get<Flat[]>(`/favourites/${ username }`)
        )
    }

    deleteFavourite(username: string, _id?: number) {

        return firstValueFrom(
            this.http.delete(`/favourites/${ username }/delete/${ _id }`)
        )
    }
}
