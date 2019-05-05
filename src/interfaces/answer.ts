import { IOwnerResponse } from './owner';

export interface IAnswerResponse {
    items?: IAnswer[];

    has_more: boolean;

    quota_max: number;

    quota_remaining: number;
}

export interface IAnswer {
    owner: IOwnerResponse;

    is_accepted: boolean;

    score: number;

    last_activity_date: number;

    creation_date: number;

    answer_id: number;

    question_id: number;

    last_edit_date?: number;

    body: string;
}
