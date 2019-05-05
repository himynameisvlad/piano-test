import { OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

import { Destroyable } from '../destroyable/destroyable.component';

export class BaseForm extends Destroyable implements OnDestroy {
    protected formControlsNames: { [controlName: string]: string };

    protected controls: { [control: string]: AbstractControl };

    isFormControlValid(form: FormGroup, controlName: string): boolean {
        const control = form.get(controlName);

        if (control.pristine) {
            return true;
        }

        return control.valid;
    }
}
