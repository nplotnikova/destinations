import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { map } from 'rxjs';

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {

    public cityBreadcrumb?: string;

    constructor(
        private router: Router,
        private _cdr: ChangeDetectorRef,
    ) {
        this.router.events.pipe(
            map(e => {
                if (e instanceof NavigationEnd) {
                    const breadcrumb = e.url.split('/').pop();
                    this.cityBreadcrumb = breadcrumb && decodeURI(breadcrumb) || breadcrumb;
                    this._cdr.markForCheck();
                }
            })).subscribe();
    }
}
