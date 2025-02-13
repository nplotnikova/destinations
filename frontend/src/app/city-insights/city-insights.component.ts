import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {catchError, Observable, of, Subject, switchMap, takeUntil} from 'rxjs';

import { City } from '@models/city';

import { CityService } from '@providers/city.service';

@Component({
    selector: 'app-city-insights',
    templateUrl: './city-insights.component.html',
    styleUrls: ['./city-insights.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityInsightsComponent implements OnInit, OnDestroy {

    public city$!: Observable<City>;

    private destroy$ = new Subject<void>();

    constructor(private route: ActivatedRoute,
                private router: Router,
                private cityService: CityService) {}

    ngOnInit(): void {
        this.city$ = this.route.params.pipe(
            takeUntil(this.destroy$),
            switchMap((params: Params) => {
                const cityName = params['name'];
                if (!cityName) {
                    return of();
                }

                return this.cityService.getOne(cityName).pipe(
                    catchError(() => this.handleError(cityName))
                );
            })
        );
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private handleError(cityName: string): Observable<never> {
        console.error(`City ${cityName} not found.`);
        this.router.navigate(['404'], { skipLocationChange: true }).then();
        return of();
    }

}
