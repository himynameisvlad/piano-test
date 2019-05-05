import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SEARCH_SEARCH_LINE_SUBROUTE, SEARCH_RESULTS_SUBROUTE } from './search.routing.const';
import { SearchComponent } from './search.component';
import { ResultsComponent } from './results/results.component';
import { SearchLineComponent } from './search-line/search-line.component';

const routes: Routes = [
    {
        path: '',
        component: SearchComponent,
        children: [
            {
                path: SEARCH_SEARCH_LINE_SUBROUTE,
                component: SearchLineComponent
            },
            {
                path: `${SEARCH_RESULTS_SUBROUTE}/:query`,
                component: ResultsComponent
            },
            {
                path: '**',
                redirectTo: SEARCH_SEARCH_LINE_SUBROUTE,
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class SearchRoutingModule {}
