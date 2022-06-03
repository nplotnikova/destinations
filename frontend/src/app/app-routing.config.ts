import { Routes } from '@angular/router';
import { CityListComponent } from '@app/city-list/city-list.component';
import { PageNotFoundComponent } from '@app/page-not-found/page-not-found.component';

export const ModuleRoutes: Routes = [
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
                loadChildren: () => import('@app/city-insights/city-insights.module').then(m => m.CityInsightsModule),
            },
        ],
    },
    {
        path: '**',
        component: PageNotFoundComponent,
    },
];
