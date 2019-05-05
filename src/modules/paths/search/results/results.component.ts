import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';

import { QUESTION_INFO_ROUTE, SEARCH_ROUTE } from '@modules/app/app.routing.const';
import { Destroyable } from '@components';
import { ApiService, NavigateService } from '@services';
import { QuestionModel, AuthorModel } from '@models';
import { PanelService } from '@ui';

@Component({
    selector: 'app-results',
    templateUrl: './results.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsComponent extends Destroyable implements OnInit {
    isLoading = true;

    questions: QuestionModel[] = [];

    relatedQuestions: QuestionModel[] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private changeDetectorRef: ChangeDetectorRef,
        private apiService: ApiService,
        private navigateService: NavigateService,
        private panelService: PanelService
    ) {
        super();

        this.onRelatedQuestionFetched = this.onRelatedQuestionFetched.bind(this);
    }

    ngOnInit() {
        this.activatedRoute.params
            .pipe(
                switchMap((params: { query: string }) => this.apiService.searchQuestions(params.query)),
                takeUntil(this.destroy$)
            ).subscribe(questions => {
                this.questions = questions;
                this.isLoading = false;

                this.changeDetectorRef.markForCheck();
            });
    }

    goToSearch() {
        this.navigateService.goTo(SEARCH_ROUTE);
    }

    showAuthorsQuestions(author: AuthorModel) {
        this.apiService.getQuestionsByAuthor(author.id)
            .pipe(
                takeUntil(this.destroy$)
            ).subscribe(this.onRelatedQuestionFetched);
    }

    showQuestionsByTag(tag: string) {
        this.apiService.getQuestionsByTag(tag)
            .pipe(
                takeUntil(this.destroy$)
            ).subscribe(this.onRelatedQuestionFetched);
    }

    showQuestionInfo(questionId: number) {
        this.navigateService.goTo(QUESTION_INFO_ROUTE, `${questionId}`);
    }

    showResults() {
        this.panelService.setActivePane('left');
        this.relatedQuestions = [];

        this.changeDetectorRef.markForCheck();
    }

    private onRelatedQuestionFetched(questions: QuestionModel[]) {
        this.relatedQuestions = questions;
        this.panelService.setActivePane('right');

        this.changeDetectorRef.markForCheck();
    }
}
