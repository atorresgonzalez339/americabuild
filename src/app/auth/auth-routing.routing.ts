import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth.component';
import {ActivationComponet} from "./activation/activation.componet";
import {RecoverComponet} from "./recover/recover.componet";

const routes: Routes = [
  {path: '', component: AuthComponent},
  {path: 'api/login', component: AuthComponent},
  {path: 'api/passwords/forgot', component: AuthComponent},
  {path: 'api/users', component: AuthComponent},
  {path: 'user/activation', component: ActivationComponet},
  {path: 'user/recover', component: RecoverComponet},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
