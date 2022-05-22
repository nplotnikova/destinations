import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { CitiesOverviewComponent } from '@app/cities-overview/cities-overview.component';
import { CityComponent } from '@app/city/city.component';
import { NotFoundComponent } from '@app/not-found/not-found.component';

@NgModule({
    declarations: [
        AppComponent,
        CityComponent,
        CitiesOverviewComponent,
        NotFoundComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
