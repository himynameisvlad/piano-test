import { AuthorModel } from '../author/author.model';

export class QuestionModel {
    constructor(
        public id: number,
        public title: string = '',
        public author: AuthorModel,
        public answerCount: number,
        public tags: string[]
    ) {}
}
