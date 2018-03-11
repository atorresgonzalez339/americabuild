import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from "../../../layouts/layout.module";
import { DefaultComponent } from "../default.component";
import {CompanyComponent} from "./company.component";
import {AddCompanyComponent} from "./addcompany.component";
import { CompanyService} from "./_services";
import {FormsModule} from '@angular/forms';
//import {AlertService} from './_services/alert.service';
const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": CompanyComponent
            },
            {
                "path": "add",
                "component": AddCompanyComponent
            },
        ]
    },
];
@NgModule({imports: [
CommonModule,RouterModule.forChild(routes),LayoutModule,
    FormsModule
],exports: [
RouterModule
],declarations: [
    CompanyComponent,
    AddCompanyComponent
],
providers: [
    CompanyService
]})
export class CompanyModule {



}
