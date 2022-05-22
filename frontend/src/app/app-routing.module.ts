import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CitiesOverviewComponent } from '@app/cities-overview/cities-overview.component';
import { CityComponent } from '@app/city/city.component';
import { NotFoundComponent } from '@app/not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
        component: CitiesOverviewComponent,
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
                component: CityComponent,
            },
        ],
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
