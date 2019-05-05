import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { NavigateService, AuthService } from '@services';
import { map, catchError } from 'rxjs/operators';
import { AUTH_ROUTE } from '@modules/app/app.routing.const';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private navigateService: NavigateService
    ) {}

    canActivate(): Observable<boolean> {
        return this.authService.current()
            .pipe(
                map(user => {
                    if (user) {
                        return true;
                    }
                }),
                catchError(() => {
                    this.navigateService.goTo(AUTH_ROUTE);

                    return of(false);
                })
            );
    }
}