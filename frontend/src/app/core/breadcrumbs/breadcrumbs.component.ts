import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import {filter, map, Subject, takeUntil, tap} from 'rxjs';

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent implements OnDestroy {

    public cityBreadcrumb!: string;

    private destroy$ = new Subject<void>();

    constructor(
        private router: Router,
        private _cdr: ChangeDetectorRef,
    ) {
        this.router.events.pipe(
            filter((event): event is NavigationEnd => event instanceof NavigationEnd),
            map(event => this.extractBreadcrumb(event.url)),
            tap(breadcrumb => {
                this.cityBreadcrumb = breadcrumb;
                this._cdr.markForCheck()
            }),
            takeUntil(this.destroy$)
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private extractBreadcrumb(url: string): string {
        const breadcrumb = url.split('/').pop();
        return breadcrumb ? decodeURI(breadcrumb) : '';
    }

}
