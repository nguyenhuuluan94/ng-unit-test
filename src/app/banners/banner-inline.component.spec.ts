import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {BannerInlineComponent} from './banner-inline.component';


describe('Banner Component (inline template)', () => {
    let comp: BannerInlineComponent;
    let fixture: ComponentFixture<BannerInlineComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    // run before each 'it'
    beforeEach(() => {
        // why creates a module instead of testing the existing module? It's more flexible since you can mock
        // services, APIs
        TestBed.configureTestingModule({
            declarations: [BannerInlineComponent]
        });

        // fixture provides access to the component instance & debugElement that provides access to the DOM
        fixture = TestBed.createComponent(BannerInlineComponent);
        // componentInstance provides access to the component variables, functions when needed
        comp = fixture.componentInstance;

        // can use queryAll() to get all elements that satisfy a condition
        de = fixture.debugElement.query(By.css('h1'));
        el = de.nativeElement;
    });

    it('should display original title', () => {
        // need to manually call change detection before each test. Otherwise, do this in TestBed.configureTestingModule
        /*
             providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        */
        // NOTE: the auto change detection is only called once. Still need to manually call change detections later since ComponentFixtureAutoDetect can only detect async activities like promises, timers & DOM events

        // change detections facilitate the data binding with DOM & calls the lifecycle hooks: ngOnInit, ngOnChanges,...
        // why not have automatic change detection? because it allows you to inspect/set up the state of the component before
        // change detection is called
        fixture.detectChanges();
        expect(el.textContent).toContain(comp.title);
    });

    it('should display a different test title', () => {
        comp.title = 'Test Title';
        fixture.detectChanges();
        expect(el.textContent).toContain('Test Title');
    });

    it('no title in the DOM until manually calling `detect changes`', () => {
        expect(el.textContent).toEqual('');
    });
});
