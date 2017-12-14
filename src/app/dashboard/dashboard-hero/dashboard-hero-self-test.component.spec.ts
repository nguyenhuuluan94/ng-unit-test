import { click } from '../../../testing';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';
import { Element } from '@angular/compiler';
import { DashboardHeroComponent } from './dashboard-hero.component';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


describe('Dashboard Hero Component', () => {
    let fixture: ComponentFixture<DashboardHeroComponent>;
    let comp: DashboardHeroComponent;
    let el: any;
    let expectedHero: Hero;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardHeroComponent]
        })
            .compileComponents();
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardHeroComponent);
        comp = fixture.componentInstance;
        el = fixture.debugElement.query(By.css('.hero'));

        expectedHero = {
            id: 42,
            name: 'Test name',
        };
        comp.hero = expectedHero;
        fixture.detectChanges();
    });

    it('should display hero name', () => {
        const expectedPipedName = expectedHero.name.toUpperCase();
        expect(el.nativeElement.textContent).toContain(expectedPipedName);
    });

    it('should raise selected event when clicked', () => {
        let selectedHero: Hero;
        comp.selected.subscribe((hero: Hero) => selectedHero = hero);

        click(el);
        expect(selectedHero).toBe(expectedHero);
    });
});
