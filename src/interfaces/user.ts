export interface IUserResponse {
    user: IUser;
}

export interface IUser {
    _id: string;

    email: string;

    token: string;
}
