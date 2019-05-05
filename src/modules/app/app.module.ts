import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from '@components';
import { AuthService } from '@services';
import { AuthInterceptor } from '../../interceptors';
import { AuthGuard } from '../../guards';

@NgModule({
    declarations: [ AppComponent ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule,
        BrowserAnimationsModule,

        AppRoutingModule,
        HeaderModule
    ],
    bootstrap: [ AppComponent ],
    providers: [
        AuthGuard,
        AuthService,

        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ]
})
export class AppModule { }
