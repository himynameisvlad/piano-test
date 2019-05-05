import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    AuthModule,
    QuestionInfoModule,
    SearchModule
} from '../paths';
import { AUTH_ROUTE, SEARCH_ROUTE, QUESTION_INFO_ROUTE } from './app.routing.const';
import { AuthGuard } from '../../guards';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: AUTH_ROUTE,
                loadChildren: () => AuthModule
            },
            {
                path: SEARCH_ROUTE,
                loadChildren: () => SearchModule,
                canActivate: [ AuthGuard ]
            },
            {
                path: `${QUESTION_INFO_ROUTE}/:id`,
                loadChildren: () => QuestionInfoModule,
                canActivate: [ AuthGuard ]
            },
            {
                path: '**',
                redirectTo: AUTH_ROUTE,
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
