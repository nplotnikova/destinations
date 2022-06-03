import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { map, Subscription } from 'rxjs';

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent implements OnDestroy {

    public cityBreadcrumb?: string;

    private routerSubscription?: Subscription;

    constructor(
        private router: Router,
        private _cdr: ChangeDetectorRef,
    ) {
        this.routerSubscription = this.router.events.pipe(
            map(e => {
                if (e instanceof NavigationEnd) {
                    const breadcrumb = e.url.split('/').pop();
                    this.cityBreadcrumb = breadcrumb && decodeURI(breadcrumb) || breadcrumb;
                    this._cdr.markForCheck();
                }
            })).subscribe();
    }

    ngOnDestroy(): void {
        this.routerSubscription?.unsubscribe();
    }
}
