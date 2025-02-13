import { TestBed } from '@angular/core/testing';
import { RouterModule } from "@angular/router";

import { AppComponent } from '@app/app.component';
import { BreadcrumbsComponent } from "@core/breadcrumbs/breadcrumbs.component";

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterModule,
            ],
            declarations: [
                AppComponent,
                BreadcrumbsComponent,
            ],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
