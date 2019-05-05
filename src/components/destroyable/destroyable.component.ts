import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class Destroyable implements OnDestroy {
    protected destroy$ = new Subject<boolean>();

    ngOnDestroy() {
        this.onDestroy();
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    protected onDestroy() {}
}
