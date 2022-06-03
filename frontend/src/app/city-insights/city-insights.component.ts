import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { catchError, Observable, of, Subscription } from 'rxjs';
import { City } from '../models/city';
import { CityService } from '../providers/city.service';

@Component({
    selector: 'app-city-insights',
    templateUrl: './city-insights.component.html',
    styleUrls: ['./city-insights.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityInsightsComponent implements OnInit, OnDestroy {

    public city$!: Observable<City>;
    private paramsSubscription!: Subscription;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private cityService: CityService) {}

    ngOnInit(): void {
        this.paramsSubscription = this.route.params.subscribe(params => {
            const cityName = params?.hasOwnProperty('name') && params['name'];
            if (!cityName) {
                return;
            }

            this.fetchCity(cityName);
        });
    }

    ngOnDestroy(): void {
        this.paramsSubscription?.unsubscribe();
    }

    private fetchCity(name: string): void {
        this.city$ = this.cityService.getOne(name).pipe(
            catchError(error => {
                this.router.navigate(['404'], { skipLocationChange: true }).then();
                console.error(`City ${name} not found.`);
                return of(error);
            }),
        );
    }
}
