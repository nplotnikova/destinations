import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@envs/environment';

import { catchError, map, Observable, of } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class GoogleMapService {

    public isLoaded$: Observable<boolean>;

    private readonly GOOGLE_MAPS_API = `https://maps.googleapis.com/maps/api/js?key=${environment.GOOGLE_MAPS_API_KEY}&libraries=places`;

    constructor(private http: HttpClient) {
        this.isLoaded$ = http.jsonp(this.GOOGLE_MAPS_API, 'callback').pipe(
            map(() => true),
            catchError(err => {
                console.error(`Google maps script could not be loaded. ${err}`);
                return of(false);
            }),
        );
    }
}
