import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
    QuestionModel,
    AuthorModel,
    AnswerModel
} from '@models';
import { IQuestionResponse, IAnswerResponse } from '@interfaces';
import { STACKOVERFLOW_API_URL } from '@const';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private API_BASE_URL = STACKOVERFLOW_API_URL;

    private BASE_SORT_ORDER_PARAMS = 'order=desc&sort=creation&site=stackoverflow';

    constructor(private httpClient: HttpClient) {}

    searchQuestions(query: string): Observable<QuestionModel[]> {
        return this.httpClient.get(
            `${this.API_BASE_URL}/search/advanced?q=${query}&${this.BASE_SORT_ORDER_PARAMS}`
        ).pipe(
            map((response: IQuestionResponse) => this.convertQuestions(response))
        );
    }

    getQuestionsByAuthor(authorId: number): Observable<QuestionModel[]> {
        return this.httpClient.get(
            `${this.API_BASE_URL}/users/${authorId}/questions?&${this.BASE_SORT_ORDER_PARAMS.replace('creation', 'votes')}`
        ).pipe(
            map((response: IQuestionResponse) => this.convertQuestions(response))
        );
    }

    getQuestionsByTag(tag: string): Observable<QuestionModel[]> {
        return this.httpClient.get(
            `${this.API_BASE_URL}/questions?tagged=${tag}&${this.BASE_SORT_ORDER_PARAMS}`
        ).pipe(
            map((response: IQuestionResponse) => this.convertQuestions(response))
        );
    }

    getAnswersByQuestionId(questionId: number): Observable<any> {
        return this.httpClient.get(
            `${this.API_BASE_URL}/questions/${questionId}/answers?filter=withbody&${this.BASE_SORT_ORDER_PARAMS}`
        ).pipe(
            map((response: IAnswerResponse) => this.convertAnwsers(response))
        );
    }

    private convertQuestions(response: IQuestionResponse): QuestionModel[] {
        return response.items.map(item => new QuestionModel(
            item.question_id,
            item.title,
            new AuthorModel(item.owner.user_id, item.owner.display_name),
            item.answer_count,
            item.tags
        ));
    }

    private convertAnwsers(response: IAnswerResponse): AnswerModel[] {
        return response.items.map(item => new AnswerModel(
            item.answer_id,
            item.body,
            new AuthorModel(item.owner.user_id, item.owner.display_name)
        ));
    }
}