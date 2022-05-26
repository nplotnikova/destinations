import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { ModuleRoutes } from '@app/app-routing.config';
import { AppComponent } from '@app/app.component';
import { CityListComponent } from '@app/city-list/city-list.component';

import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';


@NgModule({
    declarations: [
        AppComponent,
        CityListComponent,
    ],
    imports: [
        RouterModule.forRoot(ModuleRoutes),
        BrowserAnimationsModule,
        BrowserModule,
        CommonModule,
        CoreModule,
        SharedModule,

        HttpClientModule,
        HttpClientJsonpModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
