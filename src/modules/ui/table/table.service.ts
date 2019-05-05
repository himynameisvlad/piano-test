import { Injectable } from '@angular/core';

import { QuestionModel } from '@models';
import { isString } from '@helpers';
import { TableSortOption } from './models/sort-option.model';

@Injectable({
    providedIn: 'root'
})
export class TableService {
    getSortedQuestions(questions: QuestionModel[], sortOption: TableSortOption): QuestionModel[] {
        const { sortBy, order } = sortOption;
        const orderRevers = order === 'desc' ? -1 : 1;

        return questions.sort((a, b) => {
            const aValue = isString(a[sortBy]) ? a[sortBy].toLowerCase() : a[sortBy];
            const bValue = isString(b[sortBy]) ? b[sortBy].toLowerCase() : b[sortBy];

            if (aValue < bValue) {
                return -1 * orderRevers;
            }

            if (aValue > bValue) {
                return 1 * orderRevers;
            }

            return 0;
        });
    }
}