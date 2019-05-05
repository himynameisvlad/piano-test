import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionInfoComponent } from './question-info.component';

const routes: Routes = [
    {
        path: '',
        component: QuestionInfoComponent,
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class QuestionInfoRoutingModule {}
