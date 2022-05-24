import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { CityInsightsComponent } from '@app/city-insights/city-insights.component';
import { CityListComponent } from '@app/city-list/city-list.component';
import { PageNotFoundComponent } from '@app/page-not-found/page-not-found.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
    declarations: [
        AppComponent,

        CityInsightsComponent,
        CityListComponent,
        PageNotFoundComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        SharedModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
