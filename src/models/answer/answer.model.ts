import { AuthorModel } from '../author/author.model';

export class AnswerModel {
    constructor(
        public id: number,
        public body: string = '',
        public author: AuthorModel
    ) {}
}
