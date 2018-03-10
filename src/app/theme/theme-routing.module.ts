import {NgModule} from '@angular/core';
import { ThemeComponent } from './theme.component';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from "../auth/_guards/auth.guard";
import {CompanyModule} from "./pages/default/company/company.module";

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
                "path": "inner",
                "loadChildren": ".\/pages\/default\/inner\/inner.module#InnerModule"
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
                "path": "404",
                "loadChildren": ".\/pages\/default\/not-found\/not-found.module#NotFoundModule"
            },
            {
                "path": "",
                "redirectTo": "index",
                "pathMatch": "full"
            }
        ]
    },
    {
        "path": "vvbvbv/bmnb/m**",
        "redirectTo": "404",
        "pathMatch": "full"
    }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ThemeRoutingModule {}
