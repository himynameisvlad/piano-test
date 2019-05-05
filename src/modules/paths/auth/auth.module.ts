import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth.routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RestoreComponent } from './restore/restore.component';

@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        RegisterComponent,
        RestoreComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        AuthRoutingModule
    ],
    exports: [],
    providers: [],
})
export class AuthModule {}