import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

import { BaseForm } from '@components';
import { NavigateService, AuthService } from '@services';
import { AUTH_ROUTE, SEARCH_ROUTE } from '@modules/app/app.routing.const';
import { AUTH_REGISTER_SUBROUTE, AUTH_RESTORE_SUBROUTE } from '../auth.routing.const';
import { LOGIN_EMAIL_CONTROL, LOGIN_PASSWORD_CONTROLS } from './login.controls';
import { UserModel } from '@models';

@Component({
    templateUrl: './login.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends BaseForm {
    isLoading = false;

    loginFailedErrorMsg: string;

    loginForm = this.formBuilder.group({
        [LOGIN_EMAIL_CONTROL]: this.formBuilder.control(null, [Validators.required, Validators.email]),
        [LOGIN_PASSWORD_CONTROLS]: this.formBuilder.control(null, Validators.required)
    });

    formControlsNames = {
        LOGIN_EMAIL_CONTROL,
        LOGIN_PASSWORD_CONTROLS
    };

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private formBuilder: FormBuilder,
        private navigateService: NavigateService,
        private authService: AuthService
    ) {
        super();
    }

    get controls() { return this.loginForm.controls; }

    goToRegister() {
        this.navigateService.goTo(AUTH_ROUTE, AUTH_REGISTER_SUBROUTE);
    }

    goToRestore() {
        this.navigateService.goTo(AUTH_ROUTE, AUTH_RESTORE_SUBROUTE);
    }

    logIn() {
        if (this.loginForm.invalid) {
            return false;
        }

        this.isLoading = true;
        this.loginFailedErrorMsg = null;

        const formValue = this.loginForm.value;

        this.authService.login(new UserModel(
            formValue[LOGIN_EMAIL_CONTROL],
            formValue[LOGIN_PASSWORD_CONTROLS]
        )).pipe(
            takeUntil(this.destroy$)
        )
        .subscribe(
            () => this.navigateService.goTo(SEARCH_ROUTE),
            error => {
                this.loginFailedErrorMsg = error;
                this.isLoading = false;

                this.changeDetectorRef.markForCheck();
            }
        );
    }
}
