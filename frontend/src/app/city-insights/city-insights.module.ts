import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule } from '@angular/router';

import { ModuleRoutes } from '@app/city-insights/city-insights-routing.config';
import { CityInsightsComponent } from '@app/city-insights/city-insights.component';
import { MapComponent } from '@app/city-insights/map/map.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
    declarations: [
        CityInsightsComponent,
        MapComponent,
    ],
    imports: [
        RouterModule.forChild(ModuleRoutes),
        CommonModule,
        GoogleMapsModule,
        SharedModule,
    ],
})
export class CityInsightsModule {}
