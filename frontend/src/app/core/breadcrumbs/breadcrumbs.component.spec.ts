import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ReplaySubject } from 'rxjs';

import { BreadcrumbsComponent } from './breadcrumbs.component';

describe('BreadcrumbsComponent', () => {
    let component: BreadcrumbsComponent;
    let fixture: ComponentFixture<BreadcrumbsComponent>;

    const eventSubject = new ReplaySubject<RouterEvent>(1);
    const routerMock = {
        navigate: jasmine.createSpy('navigate'),
        events: eventSubject.asObservable(),
        url: ''
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BreadcrumbsComponent],
            providers: [{ provide: Router, useValue: routerMock }]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BreadcrumbsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('First breadcrumb', () => {
        it('should be equal to `Home`', () => {
            eventSubject.next(new NavigationEnd(1, '', ''))
            fixture.detectChanges();

            const compiled = fixture.nativeElement as HTMLElement;
            const breadcrumbs = compiled.querySelectorAll('.breadcrumb-item');
            expect(breadcrumbs).toHaveSize(1);
            expect(breadcrumbs[0]?.textContent).toEqual('Home');
        });
    });

    describe('Last breadcrumb', () => {
        it('should be equal to city name', () => {
            const cityName = 'New York City'
            const citySlug = encodeURI(cityName);
            const url = `/city/${citySlug}`;
            eventSubject.next(new NavigationEnd(1, url, url));
            fixture.detectChanges();

            const compiled = fixture.nativeElement as HTMLElement;
            const breadcrumbs = compiled.querySelectorAll('.breadcrumb-item');
            expect(breadcrumbs).toHaveSize(2);
            expect(breadcrumbs[1]?.textContent).toEqual(cityName);
        });
    });

    describe('Last breadcrumb', () => {
        it('should be active', () => {
            eventSubject.next(new NavigationEnd(1, '/city/dummy', '/city/dummy'))
            fixture.detectChanges();

            const compiled = fixture.nativeElement as HTMLElement;
            const breadcrumbs = compiled.querySelectorAll('.breadcrumb-item');
            expect(breadcrumbs).toHaveSize(2);
            expect(breadcrumbs[0]?.classList).not.toContain('active');
            expect(breadcrumbs[1]?.classList).toContain('active');
        });
    });
});
