import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BreadcrumbsComponent } from '@core/breadcrumbs/breadcrumbs.component';
import { PageNotFoundComponent } from '@core/page-not-found/page-not-found.component';


@NgModule({
    declarations: [
        BreadcrumbsComponent,
        PageNotFoundComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
    ],
    exports: [
        BreadcrumbsComponent
    ]
})
export class CoreModule {
}
