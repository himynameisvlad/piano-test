import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelComponent } from './panel.component';
import { PanelService } from './panel.service';

@NgModule({
    declarations: [ PanelComponent ],
    imports: [ CommonModule ],
    exports: [ PanelComponent ],
    providers: [ PanelService ]
})
export class PanelModule {}