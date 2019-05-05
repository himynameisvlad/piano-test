import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderModule } from '../loader/loader.module';
import { TableComponent } from './table.component';
import { TableService } from './table.service';

@NgModule({
    declarations: [ TableComponent ],
    imports: [
        CommonModule,

        LoaderModule
    ],
    exports: [ TableComponent ],
    providers: [ TableService ]
})
export class TableModule {}