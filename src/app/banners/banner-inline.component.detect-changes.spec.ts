import {ComponentFixture, TestBed, ComponentFixtureAutoDetect} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {BannerInlineComponent} from './banner-inline.component';


describe('Banner Component (inline template) with automatic change detection', () => {
    let comp: BannerInlineComponent;
    let fixture: ComponentFixture<BannerInlineComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    // run before each 'it'
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [BannerInlineComponent],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });

        fixture = TestBed.createComponent(BannerInlineComponent);

        comp = fixture.componentInstance;

        de = fixture.debugElement.query(By.css('h1'));
        el = de.nativeElement;
    });

    it('should display original title', () => {
        expect(el.textContent).toContain(comp.title);
    });

    it('should still see original title after comp.title changes', () => {
        const oldTitle = comp.title;
        comp.title = 'Test Title';
        // Displayed title is old because Angular didn't hear the change :(
        expect(el.textContent).toContain(oldTitle);
    });

    it('should display updated title after `detect changes`', () => {
        comp.title = 'Test Title';
        fixture.detectChanges();
        expect(el.textContent).toContain('Test Title');
    });
});
