import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { Destroyable } from '@components';
import { PanelService, Panel } from './panel.service';
import { panelAnimations } from './panel.animations';

@Component({
    selector: 'app-panel',
    templateUrl: './panel.template.html',
    styleUrls: ['./panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: panelAnimations
})
export class PanelComponent extends Destroyable implements OnInit {
    panelState: Panel;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private panelService: PanelService
    ) {
        super();
    }

    ngOnInit() {
        this.panelService.getActivePane()
            .pipe(takeUntil(this.destroy$))
            .subscribe(state => {
                this.panelState = state;
                this.changeDetectorRef.markForCheck();
            });
    }
}
