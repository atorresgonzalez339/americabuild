import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from "../../../layouts/layout.module";
import { DefaultComponent } from "../default.component";
import {RolesComponent} from "./roles.component";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": RolesComponent
            }
        ]
    }
];
@NgModule({imports: [
CommonModule,RouterModule.forChild(routes),LayoutModule
],exports: [
RouterModule
],declarations: [
    RolesComponent
]})
export class RolesModule {



}
