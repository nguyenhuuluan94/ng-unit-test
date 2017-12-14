import { UserService } from './welcome/user.service';
import { HighlightDirective } from './shared/highlight.directive';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {BannerInlineComponent} from './banners/banner-inline.component';
import {BannerComponent} from './banners/banner.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {TwainComponent} from './shared/twain.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {ROUTES} from './app.routing';

@NgModule({
    declarations: [
        AppComponent,
        BannerInlineComponent,
        BannerComponent,
        WelcomeComponent,
        TwainComponent,
        HighlightDirective
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        DashboardModule,
        RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules })
    ],
    providers: [UserService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
