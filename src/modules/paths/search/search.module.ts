import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchRoutingModule } from './search.routing.module';
import { SearchComponent } from './search.component';
import { ResultsComponent } from './results/results.component';
import { SearchLineComponent } from './search-line/search-line.component';
import { TableModule, PanelModule, LoaderModule } from '@ui';
import { ApiService } from '@services';

@NgModule({
    declarations: [
        SearchComponent,
        ResultsComponent,
        SearchLineComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,

        SearchRoutingModule,
        TableModule,
        PanelModule,
        LoaderModule
    ],
    providers: [ ApiService ]
})
export class SearchModule {}