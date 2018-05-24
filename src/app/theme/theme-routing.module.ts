import {NgModule} from '@angular/core';
import { ThemeComponent } from './theme.component';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from "../auth/_guards";
import { NgxPermissionsModule } from 'ngx-permissions';

const routes: Routes = [
    {
        "path": "",
        "component": ThemeComponent,
        "canActivate": [AuthGuard],
        "children": [
            {
                "path": "index",
                "loadChildren": ".\/pages\/aside\/index\/index.module#IndexModule"
            },
            {
                "path": "permit",
                "loadChildren": ".\/pages\/default\/permit\/permit.module#PermitModule"
            },
            {
                "path": "fees",
                "loadChildren": ".\/pages\/default\/fees\/fees.module#FeesModule"
            },
            {
                "path": "company",
                "loadChildren": ".\/pages\/default\/company\/company.module#CompanyModule"
            },
            {
                "path": "roles",
                "loadChildren": ".\/pages\/default\/roles\/roles.module#RolesModule"
            },
            {
                "path": "users",
                "loadChildren": ".\/pages\/default\/users\/users.module#UsersModule"
            },
            {
                "path": "profile",
                "loadChildren": ".\/pages\/default\/profile\/profile.module#ProfileModule"
            },
            {
                "path": "denied",
                "loadChildren": ".\/pages\/default\/access-denied\/access-denied.module#AccessDeniedModule"
            },
            {
                "path": "404",
                "loadChildren": ".\/pages\/default\/not-found\/not-found.module#NotFoundModule"
            },
            {
                "path": "",
                "redirectTo": "index",
                "pathMatch": "full",

            }
        ]
    },
    {
        "path": "**",
        "redirectTo": "404",
        "pathMatch": "full"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), NgxPermissionsModule.forChild({
        permissionsIsolate: false})],
})
export class ThemeRoutingModule {}
