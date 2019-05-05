import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';

import { ApiService } from '@services';
import { Destroyable } from '@components';
import { AnswerModel } from '@models';

@Component({
    templateUrl: './question-info.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionInfoComponent extends Destroyable implements OnInit {
    answers: AnswerModel[];

    isLoading = true;

    constructor(
        private activatedRoute: ActivatedRoute,
        private changeDetectorRef: ChangeDetectorRef,
        private apiService: ApiService
    ) {
        super();
    }

    ngOnInit() {
        this.activatedRoute.params
            .pipe(
                switchMap(params => this.apiService.getAnswersByQuestionId(params.id)),
                takeUntil(this.destroy$)
            ).subscribe(answers => {
                this.answers = answers;
                this.isLoading = false;

                this.changeDetectorRef.markForCheck();
            });
    }
}
