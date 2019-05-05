import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { SEARCH_ROUTE } from '@modules/app/app.routing.const';
import { SEARCH_RESULTS_SUBROUTE } from '../search.routing.const';
import { NavigateService } from '@services';

@Component({
    templateUrl: './search-line.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchLineComponent  {
    searchControl = new FormControl('', Validators.required);

    constructor(private navigateService: NavigateService) {}

    goToResults() {
        this.navigateService.goTo(SEARCH_ROUTE, SEARCH_RESULTS_SUBROUTE, this.searchControl.value);
    }
}
