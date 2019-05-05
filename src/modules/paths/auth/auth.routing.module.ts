import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AUTH_LOGIN_SUBROUTE, AUTH_REGISTER_SUBROUTE, AUTH_RESTORE_SUBROUTE } from './auth.routing.const';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RestoreComponent } from './restore/restore.component';

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: AUTH_LOGIN_SUBROUTE,
                component: LoginComponent
            },
            {
                path: AUTH_REGISTER_SUBROUTE,
                component: RegisterComponent
            },
            {
                path: AUTH_RESTORE_SUBROUTE,
                component: RestoreComponent
            },
            {
                path: '**',
                redirectTo: AUTH_LOGIN_SUBROUTE,
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
