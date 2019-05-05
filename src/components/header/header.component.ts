import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { NavigateService, AuthService } from '@services';
import { Destroyable } from '@components/destroyable/destroyable.component';
import { SEARCH_ROUTE, AUTH_ROUTE } from '@modules/app/app.routing.const';

@Component({
    selector: 'app-header',
    templateUrl: './header.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent extends Destroyable implements OnInit {
    showLogout: boolean;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private authService: AuthService,
        private navigateService: NavigateService
    ) {
        super();
    }

    ngOnInit() {
        this.authService.getIsAuthentiated()
            .pipe(takeUntil(this.destroy$))
            .subscribe(isAuthenticated => {
                this.showLogout = isAuthenticated;

                this.changeDetectorRef.markForCheck();
            });

    }

    logout() {
        this.authService.logout();
        this.navigateService.goTo(AUTH_ROUTE);
    }

    goToSearch($event: Event) {
        $event.preventDefault();

        this.navigateService.goTo(SEARCH_ROUTE);
    }
}
