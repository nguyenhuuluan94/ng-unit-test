import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRouteStub } from '../../../testing/router-stubs';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroService } from '../hero.service';
import { HeroDetailComponent } from './hero-detail.component';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Hero } from '../hero';
import { click } from '../../../testing/index';

let expectedHero: Hero;
let fixture: ComponentFixture<HeroDetailComponent>;
let comp: HeroDetailComponent;
let de: DebugElement;
let page: Page;
let activatedRoute: ActivatedRouteStub;

class Page {
    gotoSpy: jasmine.Spy;
    navSpy: jasmine.Spy;

    saveBtn: DebugElement;
    cancelBtn: DebugElement;
    nameDisplay: HTMLElement;
    nameInput: HTMLInputElement;

    constructor() {
        const router = TestBed.get(Router); // get router form root injector
        this.gotoSpy = spyOn(comp, 'gotoList').and.callThrough();
        this.navSpy = spyOn(router, 'navigateByUrl');
    }

    /** Add page elements after hero arrives */
    addPageElements() {
        if (comp.hero) {
            // have a hero so these elements are now in the DOM
            const buttons = fixture.debugElement.queryAll(By.css('button'));
            this.saveBtn = buttons[0];
            this.cancelBtn = buttons[1];
            this.nameDisplay = fixture.debugElement.query(By.css('span')).nativeElement;
            this.nameInput = fixture.debugElement.query(By.css('input')).nativeElement;
        }
    }
}

class RouterStub {
    navigateByUrl(url: string) {
        return url;
    }
}

describe('Hero Detail Component: navigating to existing hero', () => {
    function createComponent() {
        fixture = TestBed.createComponent(HeroDetailComponent);
        comp = fixture.componentInstance;

        expectedHero = {
            id: 1,
            name: 'Wonder woman'
        };
        activatedRoute = TestBed.get(ActivatedRoute);
        activatedRoute.testParamMap = { id: expectedHero.id };

        page = new Page();

        // 1st change detection triggers ngOnInit which gets a hero
        fixture.detectChanges();
        return fixture.whenStable().then(() => {
            // 2nd change detection displays the async-fetched hero
            fixture.detectChanges();
            page.addPageElements();
        });
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [HeroDetailComponent],
            providers: [
                {provide: ActivatedRoute, useClass: ActivatedRouteStub},
                { provide: Router, useClass: RouterStub},
                HeroService
            ]
        }).compileComponents().then(() => {
            createComponent();
        });

    }));

    it('should display that hero\'s name', () => {
        expect(page.nameDisplay.textContent.toLowerCase()).toBe(expectedHero.name.toLowerCase());
    });

    it('should navigate when clicking cancel', () => {
        click(page.cancelBtn);
        expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });

    it('should convert hero name to title case', () => {
        const inputName = 'quick BROWN fox';
        const titleCaseName = 'Quick Brown Fox';

        // simulate user entering new name into the input box
        page.nameInput.value = inputName;

        // dispatch a DOM event so that Angular learns input value change
        page.nameInput.dispatchEvent(new Event('input'));

        // Tell Angular to update the span via the title pipe
        fixture.detectChanges();

        expect(page.nameDisplay.textContent).toBe(titleCaseName);
    });
});

describe('Hero Detail Component: navigating to non-existent hero', () => {
    function createComponent() {
        fixture = TestBed.createComponent(HeroDetailComponent);
        comp = fixture.componentInstance;

        expectedHero = {
            id: 1,
            name: 'Wonder woman'
        };
        activatedRoute = TestBed.get(ActivatedRoute);
        activatedRoute.testParamMap = { id: 9999 };

        page = new Page();

        // 1st change detection triggers ngOnInit which gets a hero
        fixture.detectChanges();
        return fixture.whenStable().then(() => {
            // 2nd change detection displays the async-fetched hero
            fixture.detectChanges();
            page.addPageElements();
        });
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [HeroDetailComponent],
            providers: [
                { provide: ActivatedRoute, useClass: ActivatedRouteStub },
                { provide: Router, useClass: RouterStub },
                HeroService
            ]
        }).compileComponents().then(() => {
            createComponent();
        });

    }));

    // it('should display that hero\'s name', () => {
    //     expect(page.nameDisplay.textContent.toLowerCase()).toBe(expectedHero.name.toLowerCase());
    // });
    it('should try to navigate back to the hero list', () => {
        expect(page.gotoSpy.calls.any()).toBe(true, 'comp.gotoList called');
        expect(page.navSpy.calls.any()).toBe(true, 'navigateByUrl called');
    });
});