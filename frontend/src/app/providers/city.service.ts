import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { City } from '@models/city';

import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CityService {

    private readonly CITIES_URL = '/api/cities';
    private readonly CITY_URL = `${this.CITIES_URL}/{name}`;

    constructor(private http: HttpClient) {
    }

    public getAll(): Observable<City[]> {
        return this.http.get<City[]>(this.CITIES_URL);
    }

    public getOne(name: string): Observable<City> {
        return this.http.get<City>(this.CITY_URL.replace(/{name}/, name));
    }
}
