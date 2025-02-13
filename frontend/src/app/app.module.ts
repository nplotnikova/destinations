import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi, withJsonpSupport } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { ModuleRoutes } from '@app/app-routing.config';
import { AppComponent } from '@app/app.component';
import { CityListComponent } from '@app/city-list/city-list.component';
import { PageNotFoundComponent } from '@app/page-not-found/page-not-found.component';

import { CoreModule } from '@core/core.module';


@NgModule({
    declarations: [
        AppComponent,
        CityListComponent,
        PageNotFoundComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        RouterModule.forRoot(ModuleRoutes),
        BrowserAnimationsModule,
        BrowserModule,
        CommonModule,
        CoreModule
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi(), withJsonpSupport())
    ]
})
export class AppModule {
}
