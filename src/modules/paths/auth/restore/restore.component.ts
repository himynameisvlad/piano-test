import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

import { NavigateService , AuthService} from '@services';
import { BaseForm } from '@components';
import { UserModel } from '@models';
import { AUTH_ROUTE } from '@modules/app/app.routing.const';
import { AUTH_LOGIN_SUBROUTE } from '../auth.routing.const';
import { RESTORE_EMAIL_CONTROL, RESTORE_SECRET_CONTROL } from './restore.controls';

@Component({
    templateUrl: './restore.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestoreComponent extends BaseForm {
    isLoading = false;

    isRestoreSuccessed = false;

    restoreFailedErrorMsg: string;

    restoreForm = this.formBuilder.group({
        [RESTORE_EMAIL_CONTROL]: this.formBuilder.control(null, [Validators.required, Validators.email]),
        [RESTORE_SECRET_CONTROL]: this.formBuilder.control(null, Validators.required)
    });

    formControlsNames = {
        RESTORE_EMAIL_CONTROL,
        RESTORE_SECRET_CONTROL
    };

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private formBuilder: FormBuilder,
        private navigateService: NavigateService,
        private authService: AuthService
    ) {
        super();
    }

    get controls() { return this.restoreForm.controls; }

    restore() {
        if (this.restoreForm.invalid) {
            return false;
        }

        this.isLoading = true;
        this.restoreFailedErrorMsg = null;

        const formValue = this.restoreForm.value;

        this.authService.restore(
            new UserModel(
                formValue[RESTORE_EMAIL_CONTROL],
                null,
                formValue[RESTORE_SECRET_CONTROL]
            )
        ).pipe(
            takeUntil(this.destroy$)
        )
        .subscribe(
            () => {
                this.isRestoreSuccessed = true;
                this.changeDetectorRef.markForCheck();
            },
            error => {
                this.restoreFailedErrorMsg = error;
                this.isLoading = false;

                this.changeDetectorRef.markForCheck();
            }
        );
    }

    goToLogin() {
        this.navigateService.goTo(AUTH_ROUTE, AUTH_LOGIN_SUBROUTE);
    }
}
