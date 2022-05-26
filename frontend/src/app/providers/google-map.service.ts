import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class GoogleMapService {

    public isLoaded$: Observable<boolean>;

    private readonly GOOGLE_MAPS_API = `https://maps.googleapis.com/maps/api/js?key=${environment.GOOGLE_MAPS_API_KEY}&libraries=places`;

    constructor(private http: HttpClient) {
        this.isLoaded$ = this.http.jsonp(this.GOOGLE_MAPS_API, 'callback').pipe(
            map(() => true),
            shareReplay(),
            catchError(err => {
                console.error(`Google maps script could not be loaded. ${err}`);
                return of(false);
            }),
        );
    }
}
