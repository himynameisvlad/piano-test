import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserModel } from '@models';
import { IUserResponse, IUser } from '@interfaces';
import { STORAGE_USER_KEY, AUTH_API_URL } from '@const';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private AUTH_BASE_URL = AUTH_API_URL;

    private _isAuthentiated$ = new BehaviorSubject<boolean>(false);

    constructor(private httpClient: HttpClient) {
        this.initIsAuthenticated();
    }

    initIsAuthenticated() {
        if (localStorage.getItem(STORAGE_USER_KEY)) {
            this._isAuthentiated$.next(true);
        }
    }

    getIsAuthentiated(): Observable<boolean> {
        return this._isAuthentiated$.asObservable();
    }

    register(user: UserModel): Observable<UserModel> {
        return this.httpClient.post(`${this.AUTH_BASE_URL}/users`, {
            user
        }).pipe(
            map((userResponse: IUserResponse) => this.onLoggedIn(userResponse))
        );
    }

    restore(user: UserModel): Observable<Object> {
        return this.httpClient.post(`${this.AUTH_BASE_URL}/users/restore`, {
            user
        });
    }

    login(user: UserModel): Observable<UserModel> {
        return this.httpClient.post(`${this.AUTH_BASE_URL}/users/login`, {
            user
        }).pipe(
            map((userResponse: IUserResponse) => this.onLoggedIn(userResponse))
        );
    }

    current(): Observable<IUser> {
        return this.httpClient.get(`${this.AUTH_BASE_URL}/users/current`)
            .pipe(
                map(({ user }: IUserResponse) => user)
            );
    }

    logout() {
        localStorage.removeItem(STORAGE_USER_KEY);
        this._isAuthentiated$.next(false);
    }

    private onLoggedIn({ user }: IUserResponse): UserModel {
        if (user && user.token) {
            localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
            this._isAuthentiated$.next(true);
        }

        return new UserModel(user._id, user.email);
    }
}
