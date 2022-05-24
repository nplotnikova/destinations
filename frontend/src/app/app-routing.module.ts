import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityInsightsComponent } from '@app/city-insights/city-insights.component';

import { CityListComponent } from '@app/city-list/city-list.component';
import { PageNotFoundComponent } from '@app/page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: '',
        component: CityListComponent,
    },
    {
        path: 'city',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: '/',
            },
            {
                path: ':name',
                component: CityInsightsComponent,
            },
        ],
    },
    {
        path: '**',
        component: PageNotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
