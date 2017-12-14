import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {WelcomeComponent} from './welcome.component';
import {UserService} from './user.service';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('WelcomeComponent', () => {
    let component: WelcomeComponent;
    let fixture: ComponentFixture<WelcomeComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let userService: UserService;

    // should mock the service since you're testing the component, not the service! Also when the service contains calls to APIs,
    // it should be mocked to avoid problems
    const userServiceStub = {
        isLoggedIn: true,
        user: {name: 'Test User'}
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WelcomeComponent],
            // declare the mocked service
            providers: [
                {provide: UserService, useValue: userServiceStub}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WelcomeComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('.welcome'));
        el = de.nativeElement;
        // get access to the user service
        // why not just use the userServiceStub? because it's different from the userService injected into the component. check the test below
        userService = de.injector.get(UserService);

    });

    // this is a good test to check if the component is created correctly
    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    // it('stub object & injected UserService should not be the same', () => {
    //     expect(userServiceStub === userService).toBe(false);

    //     // changing the stub object has no effect on the injected service
    //     userServiceStub.isLoggedIn = false;
    //     expect(userService.isLoggedIn).toBe(true);
    // });

    it('should welcome the user', () => {
        fixture.detectChanges();
        const content = el.textContent;
        expect(content).toContain('Welcome', '"Welcome ..."');
        expect(content).toContain('Test User', 'expected name');
    });

    it('should welcome Bubba', () => {
        // should not call fixture.detectChanges() before changing service property values. Otherwise, the test will fail because
        // ngOnInit() is called only once.
        userService.user.name = 'Bubba';
        fixture.detectChanges();
        expect(el.textContent).toContain('Bubba');
    });

    it('should request login if not logged in', () => {
       userService.isLoggedIn = false;
       fixture.detectChanges();
       const content = el.textContent;
       expect(content).not.toContain('Welcome', 'not welcomed');
       expect(content).toMatch(/log in/i, '"log in"');
    });
});
