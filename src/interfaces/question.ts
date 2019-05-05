import { IOwnerResponse } from './owner';

export interface IQuestionResponse {
    items?: IQuestion[];

    has_more: boolean;

    quota_max: number;

    quota_remaining: number;
}

export interface IQuestion {
    tags?: string[];

    owner: IOwnerResponse;

    is_answered: boolean;

    view_count: number;

    closed_date?: number;

    answer_count: number;

    score: number;

    last_activity_date: number;

    creation_date: number;

    question_id: number;

    link: string;

    closed_reason?: string;

    title: string;

    last_edit_date?: number;

    accepted_answer_id?: number;

    protected_date?: number;
}
