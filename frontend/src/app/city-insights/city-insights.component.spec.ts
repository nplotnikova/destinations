import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityInsightsComponent } from './city-insights.component';

describe('CityInsightsComponent', () => {
    let component: CityInsightsComponent;
    let fixture: ComponentFixture<CityInsightsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CityInsightsComponent],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CityInsightsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
