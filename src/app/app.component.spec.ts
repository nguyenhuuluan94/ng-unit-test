import { HighlightDirective } from './shared/highlight.directive';
import { click } from '../testing';
import { By } from '@angular/platform-browser';
import { RouterLinkStubDirective } from '../testing/router-link-stubs';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {AppComponent} from './app.component';
import {TwainComponent} from './shared/twain.component';
import {HttpModule} from '@angular/http';
import {DashboardModule} from './dashboard/dashboard.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let comp: AppComponent;
    let de: DebugElement;
    let linkDebugEls: DebugElement[];
    let linkDirectives: RouterLinkStubDirective[];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule, DashboardModule, RouterTestingModule],
            declarations: [
                AppComponent,
                RouterLinkStubDirective,
                HighlightDirective
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(AppComponent);
            comp = fixture.componentInstance;
            de = fixture.debugElement;
            fixture.detectChanges();

            // find DebugElements with an attached RouterLinkStubDirective
            linkDebugEls = de.queryAll(By.directive(RouterLinkStubDirective));

            // get the attached link directive instances using the DebugElement injectors
            linkDirectives = linkDebugEls.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
        });
    }));

    it('should create the app', async(() => {
        expect(comp).toBeTruthy();
    }));

    it(`should have as title 'app works!'`, async(() => {
        expect(comp.title).toEqual('app works!');
    }));

    it('should render title in a h1 tag', async(() => {
        expect(de.nativeElement.querySelector('h1').textContent).toContain('app works!');
    }));

    it('should get RouterLinks from template', () => {
        expect(linkDirectives.length).toBe(2, 'should have 2 linkDirectives');
        expect(linkDirectives[0].linkParams).toBe('/quote', '1st link should go to Twain Quote');
        expect(linkDirectives[1].linkParams).toBe('/heroes', '2nd link should go to Heroes');
    });

    it('should click Heroes link in template', () => {
        const heroesLinkDe = linkDebugEls[1];
        const heroesLink = linkDirectives[1];

        expect(heroesLink.navigatedTo).toBeNull('link should not have nagivated yet');

        click(heroesLinkDe);
        fixture.detectChanges();

        expect(heroesLink.navigatedTo).toBe('/heroes');
    });

    // it('should have skyblue h1', () => {
    //     const h1 = de.query(By.css('h1'));
    //     const bgColor = h1.nativeElement.style.backgroundColor;
    //     expect(bgColor).toBe('skyblue');
    // });
});
