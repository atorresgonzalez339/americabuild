import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BaseRequestOptions, HttpModule} from '@angular/http';

import {AuthRoutingModule} from './auth-routing.routing';
import {AuthComponent} from './auth.component';
import {AlertComponent} from './_directives/alert.component';
import {LogoutComponent} from './logout/logout.component';
import {AuthGuard} from './_guards/auth.guard';
import {AlertService} from './_services/alert.service';
import {AuthenticationService} from './_services/authentication.service';
import {UserService} from './_services/user.service';
import {ActivationComponet} from "./activation/activation.componet";
import {RecoverComponet} from "./recover/recover.componet";

@NgModule({
  declarations: [
    AuthComponent,
    AlertComponent,
    LogoutComponent,
    ActivationComponet,
    RecoverComponet
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    AuthRoutingModule,
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    BaseRequestOptions,
  ],
  entryComponents: [AlertComponent],
})

export class AuthModule {
}
