import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundComponent } from '@app/page-not-found/page-not-found.component';

describe('PageNotFoundComponent', () => {
    let component: PageNotFoundComponent;
    let fixture: ComponentFixture<PageNotFoundComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PageNotFoundComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PageNotFoundComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('headline', () => {
        it('should be equal to 404', () => {
            const compiled = fixture.nativeElement as HTMLElement;
            const headline = compiled.querySelector('h1');
            expect(headline?.textContent).toEqual('404');
        });
    });
});
