import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { CityShortInfo } from '@models/city';

import { CityService } from '@providers/city.service';

import { catchError, Observable, of } from 'rxjs';

@Component({
    selector: 'app-city-list',
    templateUrl: './city-list.component.html',
    styleUrls: ['./city-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityListComponent implements OnInit {

    public cities$!: Observable<CityShortInfo[]>;

    constructor(private cityService: CityService,
                private _cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.cities$ = this.cityService.getAll().pipe(
            catchError(err => {
                console.error(err);
                return of([] as CityShortInfo[]);
            }),
        );
    }
}
