import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

import { NavigateService, AuthService } from '@services';
import { BaseForm } from '@components';
import {
    REGISTER_EMAIL_CONTROL,
    REGISTER_PASSWORD_CONTROL,
    REGISTER_SECRET_CONTROL
} from './register.controls';
import { AUTH_ROUTE, SEARCH_ROUTE } from '@modules/app/app.routing.const';
import { AUTH_LOGIN_SUBROUTE } from '../auth.routing.const';
import { UserModel } from '@models';

@Component({
    templateUrl: './register.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent extends BaseForm {
    isLoading = false;

    registrationFailedErrorMsg: string;

    registerForm = this.formBuilder.group({
        [REGISTER_EMAIL_CONTROL]: this.formBuilder.control(null, [Validators.required, Validators.email]),
        [REGISTER_PASSWORD_CONTROL]: this.formBuilder.control(null, Validators.required),
        [REGISTER_SECRET_CONTROL]: this.formBuilder.control(null, Validators.required)
    });

    formControlsNames = {
        REGISTER_EMAIL_CONTROL,
        REGISTER_PASSWORD_CONTROL,
        REGISTER_SECRET_CONTROL
    };

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private navigateService: NavigateService
    ) {
        super();
    }

    get controls() { return this.registerForm.controls; }

    goToLogin() {
        this.navigateService.goTo(AUTH_ROUTE, AUTH_LOGIN_SUBROUTE);
    }

    register() {
        if (this.registerForm.invalid) {
            return false;
        }

        this.isLoading = true;
        this.registrationFailedErrorMsg = null;

        const formValue = this.registerForm.value;

        this.authService.register(
            new UserModel(
                formValue[REGISTER_EMAIL_CONTROL],
                formValue[REGISTER_PASSWORD_CONTROL],
                formValue[REGISTER_SECRET_CONTROL]
            )
        ).pipe(
            takeUntil(this.destroy$)
        )
        .subscribe(
            () => this.navigateService.goTo(SEARCH_ROUTE),
            error => {
                this.registrationFailedErrorMsg = error;
                this.isLoading = false;

                this.changeDetectorRef.markForCheck();
            }
        );
    }
}
