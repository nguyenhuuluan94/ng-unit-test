import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TwainComponent } from './twain.component';
import { TwainService } from './twain.service';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Http, HttpModule } from '@angular/http';

describe('Twain component', () => {
    let fixture: ComponentFixture<TwainComponent>;
    let comp: TwainComponent;
    let de: DebugElement;
    let el: HTMLElement;
    let twainService: TwainService;
    let spy: any;

    const testQuote = 'Out of sight, out of mind';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            declarations: [TwainComponent],
            providers: [TwainService]
        });

        fixture = TestBed.createComponent(TwainComponent);
        comp = fixture.componentInstance;

        twainService = fixture.debugElement.injector.get(TwainService);

        // spy on the real service but return a resolved promise immediately -> alternative to mocking the service
        spy = spyOn(twainService, 'getQuote')
            .and.returnValue(Promise.resolve(testQuote));

        de = fixture.debugElement.query(By.css('.twain'));
        el = de.nativeElement;
    });

    it('should not show quote before OnInit', () => {
        expect(el.textContent).toBe('', 'nothing displayed');
        expect(spy.calls.any()).toBe(false, 'getQuote not yet called');
    });

    it('should still not show quote after component initialised', () => {
        fixture.detectChanges();
        expect(el.textContent).toBe('...', 'no quote yet');
        expect(spy.calls.any()).toBe(true, 'getQuote called');
    });

    // async() used to get data returned by async activities
    it('should show quote after getQuote promise (async)', async () => {
        fixture.detectChanges();

        fixture.whenStable().then(() => { // wait for the async getQuote
            fixture.detectChanges(); // update view with quote
            expect(el.textContent).toBe(testQuote);
        });
    });

    // fakeAsync is the same but provides more linear code
    // Limitation: fakeAsync cannot handle XHR calls
    it('should show quote after getQuote promise (fake async)', fakeAsync(() => {
        fixture.detectChanges();
        tick(); // wait for async getQuote
        fixture.detectChanges();
        expect(el.textContent).toBe(testQuote);
    }));

    // this is useful for handling activities that contain timer like setTimeout() since async & fakeAsync cannot handle such
    // it('should show quote after getQuote promise (done)', (done: any) => {
    //     fixture.detectChanges();

    //     // get the spy promise and wait for it to resolve
    //     spy.calls.mostRecent().returnValue.then(() => {
    //         fixture.detectChanges(); // update view with quote
    //         expect(el.textContent).toBe(testQuote);
    //         done();
    //     });
    // });
});
