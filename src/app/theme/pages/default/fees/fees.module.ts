import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FeesComponent } from './fees.component';
import { AddFeesComponent } from './add.fees.component';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataTableModule } from 'primeng/datatable';
import {FeesService} from './_services/index'

const routes: Routes = [
    {
        'path': '',
        'component': DefaultComponent,
        'children': [
            {
                'path': '',
                'component': FeesComponent
            },
            {
                'path': 'add',
                'component': AddFeesComponent
            },
            {
                'path': 'edit',
                'component': AddFeesComponent
            },
        ]
    }
];
@NgModule({imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule,
        FormsModule, ReactiveFormsModule, DataTableModule
    ], exports: [ RouterModule
    ], declarations: [
        FeesComponent,
        AddFeesComponent
    ], providers: [FeesService]
})
export class FeesModule
{
}