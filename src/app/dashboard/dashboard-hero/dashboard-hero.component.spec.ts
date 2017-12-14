///<reference path="../hero.ts"/>
import { click } from '../../../testing';
import {DashboardHeroComponent} from './dashboard-hero.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Component, DebugElement} from '@angular/core';
import {Hero} from '../hero';

@Component({
    template: `<app-dashboard-hero [hero]="hero" (selected)="onSelected($event)"></app-dashboard-hero>`
})
class TestHostComponent {
    hero = {name: 'Test Name'};
    selectedHero: Hero;
    onSelected(hero: Hero) { this.selectedHero = hero; };
}

describe('Dashboard Hero Component', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let testHost: TestHostComponent;
    let heroEl: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardHeroComponent, TestHostComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        // create TestHostComponent instead of DashboardHeroComponent
        fixture = TestBed.createComponent(TestHostComponent);
        testHost = fixture.componentInstance;
        heroEl = fixture.debugElement.query(By.css('.hero'));
        fixture.detectChanges(); // trigger initial data binding
    });

    it('should display an uppercase hero name', () => {
       const expectedPipedName = testHost.hero.name.toUpperCase();
       expect(heroEl.nativeElement.textContent).toContain(expectedPipedName);
    });

    it('should raise selected event when clicked', () => {
       click(heroEl);
       expect(testHost.selectedHero).toBe(testHost.hero);
    });
});
