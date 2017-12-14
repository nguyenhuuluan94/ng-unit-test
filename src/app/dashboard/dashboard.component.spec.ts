import { click } from '../../testing';
import { HeroService } from './hero.service';
import {DashboardComponent} from './dashboard.component';
import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {By} from '@angular/platform-browser';
import {DashboardHeroComponent} from './dashboard-hero/dashboard-hero.component';

// Router has a complicated API and links to other services
// you should test the component, not the router, so just mock it
class RouterStub {
    navigateByUrl(url: string) {
        return url;
    }
}

describe('Dashboard Component', () => {
    let fixture: ComponentFixture<DashboardComponent>;
    let comp: DashboardComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardComponent, DashboardHeroComponent],
            providers: [
                {provide: Router, useClass: RouterStub},
                // HeroService does not call API, so don't need to mock it
                HeroService
            ],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(DashboardComponent);
            comp = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    // inject() is similar to using Testbed.get(Router). NOTE: it only returns services at the root level (e.g. app.module), not from the component providers
    it('should tell ROUTER to navigate when hero is clicked', inject([Router], (router: Router) => {
        const spy = spyOn(router, 'navigateByUrl');

        const heroEl = fixture.debugElement.query(By.css('.hero'));
        click(heroEl);

        // args passed to router.navigateByUrl()
        const navArgs = spy.calls.first().args[0];

        // expecting to navigate to id of the component's first hero
        const id = comp.heroes[0].id;
        expect(navArgs).toBe('/heroes/' + id, 'should navigate to HeroDetail for first hero');
    }));
});
