import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FeesComponent } from './fees.component';
import { AddFeesComponent } from './add.fees.component';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataTableModule } from 'primeng/datatable';
import {FeesService, CompanyFeesService} from './_services/index'
import {CompanyFeesComponent} from './company.fees.component';
import {AddCompanyFeesComponent} from './add.company.fees.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import {Helpers} from "../../../.././helpers";

const routes: Routes = [
    {
        'path': '',
        'component': DefaultComponent,
        'canActivate': [NgxPermissionsGuard],
        'data': {
            permissions: {
                only: 'ROLE_ADMINISTRATOR',
                redirectTo: () => {
                    Helpers.setLoading(false, true);
                    return '/denied';
                }
            }},
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
            {
                'path': 'company-fees',
                'component': CompanyFeesComponent
            },
            {
                'path': 'company-fees/add',
                'component': AddCompanyFeesComponent
            },
            {
                'path': 'company-fees/edit',
                'component': AddCompanyFeesComponent
            }
        ]
    }
];
@NgModule({imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule,
        FormsModule, ReactiveFormsModule, DataTableModule
    ], exports: [ RouterModule
    ], declarations: [
        FeesComponent,
        AddFeesComponent,
        CompanyFeesComponent,
        AddCompanyFeesComponent
    ], providers: [FeesService, CompanyFeesService]
})
export class FeesModule
{
}