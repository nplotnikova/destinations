import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { City } from '@models/city';

import { CityService } from '@providers/city.service';

import { finalize, Observable } from 'rxjs';

@Component({
    selector: 'app-city',
    templateUrl: './city.component.html',
    styleUrls: ['./city.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityComponent implements OnInit {

    public city$!: Observable<City>;
    public loading!: boolean;

    constructor(private route: ActivatedRoute,
                private cityService: CityService,
                private _cdr: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        const name = this.route.snapshot.paramMap.get('name');
        if (!name) {
            return;
        }

        this.loading = true;
        this.city$ = this.cityService.getOne(name).pipe(
            finalize(() => {
                this.loading = false;
                this._cdr.markForCheck();
            }),
        );
    }
}
