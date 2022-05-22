import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { City } from '@models/city';

import { CityService } from '@providers/city.service';

import { finalize, Observable } from 'rxjs';

@Component({
    selector: 'app-cities-overview',
    templateUrl: './cities-overview.component.html',
    styleUrls: ['./cities-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CitiesOverviewComponent implements OnInit {

    public cities$!: Observable<City[]>;
    public loading!: boolean;

    constructor(private cityService: CityService,
                private _cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.loading = true;
        this.cities$ = this.cityService.getAll().pipe(
            finalize(() => {
                this.loading = false;
                this._cdr.markForCheck();
            }),
        );
    }
}
