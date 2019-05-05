import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { STORAGE_USER_KEY, STACKOVERFLOW_API_URL } from '@const';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private HTTP_ERROR_CODES = {
        authFailed: 422
    };

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = JSON.parse(localStorage.getItem(STORAGE_USER_KEY));

        if (currentUser && currentUser.token && !req.url.startsWith(STACKOVERFLOW_API_URL)) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Token ${currentUser.token}`
                }
            });
        }

        return next.handle(req)
            .pipe(
                catchError(err => this.handleError(err))
            );
    }

    private handleError(errorResponse: HttpErrorResponse): Observable<HttpEvent<Error>> {
        let error: string;

        if (errorResponse.status === this.HTTP_ERROR_CODES.authFailed) {
            error = errorResponse.error.errors.failed || errorResponse.statusText;
        }


        return throwError(error);
    }
}