import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutComponent } from "./auth/logout/logout.component";
import {ActivationComponet} from "./auth/activation/activation.componet";
import {RecoverComponet} from "./auth/recover/recover.componet";

const routes: Routes = [
	{path: 'login', loadChildren: './auth/auth.module#AuthModule'},
	{path: 'logout', component: LogoutComponent},
	{path: '', redirectTo: 'index', pathMatch: 'full'},
	{path: 'user/activation', component: ActivationComponet},
	{path: 'user/recover', component: RecoverComponet},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
