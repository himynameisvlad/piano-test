import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafeHtmlPipe } from '@pipes';
import { LoaderModule } from '@ui';
import { QuestionInfoRoutingModule } from './question-info.routing.module';
import { QuestionInfoComponent } from './question-info.component';

@NgModule({
    declarations: [
        QuestionInfoComponent,
        SafeHtmlPipe
    ],
    imports: [
        CommonModule,

        QuestionInfoRoutingModule,
        LoaderModule
    ]
})
export class QuestionInfoModule {}