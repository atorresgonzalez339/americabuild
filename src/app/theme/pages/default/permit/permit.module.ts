import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PermitComponent } from './permit.component';
import { AddPermitComponent } from './add.permit.component';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": PermitComponent
            },
            {
                "path": "add",
                "component": AddPermitComponent
            },
        ]
    }
];
@NgModule({imports: [
    CommonModule,RouterModule.forChild(routes),LayoutModule,
    FormsModule
],exports: [
    RouterModule
],declarations: [
    PermitComponent,
    AddPermitComponent
]})
export class PermitModule  {



}