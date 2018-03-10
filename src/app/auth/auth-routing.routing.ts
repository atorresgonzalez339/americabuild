import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth.component';

const routes: Routes = [
  {path: '', component: AuthComponent},
  {path: 'api/login', component: AuthComponent},
  {path: 'api/passwords/forgot', component: AuthComponent},
  {path: 'api/users', component: AuthComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
