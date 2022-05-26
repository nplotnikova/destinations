import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { City } from '@models/city';

import { CityService } from '@providers/city.service';

import { catchError, Observable, of } from 'rxjs';

@Component({
    selector: 'app-city-insights',
    templateUrl: './city-insights.component.html',
    styleUrls: ['./city-insights.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityInsightsComponent implements OnInit {

    public city$!: Observable<City>;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private cityService: CityService) {}

    ngOnInit(): void {
        const name = this.route.snapshot.paramMap.get('name');
        if (!name) {
            return;
        }

        this.city$ = this.cityService.getOne(name).pipe(
            catchError(error => {
                this.router.navigate(['404'], { skipLocationChange: true }).then();
                console.error(`City ${name} not found.`);
                return of(error);
            }),
        );
    }
}
