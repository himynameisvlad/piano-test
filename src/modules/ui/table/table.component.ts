import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { QuestionModel, AuthorModel } from '@models';
import { TableSortOption } from './models/sort-option.model';
import { TableService } from './table.service';

@Component({
    selector: 'app-table',
    templateUrl: './table.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
    @Input() questions: QuestionModel[];

    @Output() onAuthorClick = new EventEmitter<string>();

    @Output() onTitleClick = new EventEmitter<number>();

    @Output() onAnswerCountClick = new EventEmitter<AuthorModel>();

    @Output() onTagClick = new EventEmitter<string>();

    sortOptions: TableSortOption[];

    constructor(
        private tableService: TableService,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.sortOptions = [
            new TableSortOption('Title desc', 'title', 'desc'),
            new TableSortOption('Title asc', 'title', 'asc'),
            new TableSortOption('Answer count desc', 'answerCount', 'desc'),
            new TableSortOption('Answer count asc', 'answerCount', 'asc')
        ];
    }

    sort(sortOption: TableSortOption) {
        this.toggleSortOptions(sortOption);

        this.questions = [...this.tableService.getSortedQuestions(this.questions, sortOption)];

        this.changeDetectorRef.markForCheck();
    }

    private toggleSortOptions(sortOption: TableSortOption) {
        this.sortOptions = this.sortOptions.map(option => {
            option.setIsSorted(option === sortOption);

            return option;
        });
    }
}
