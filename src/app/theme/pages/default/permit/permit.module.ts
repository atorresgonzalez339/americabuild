import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {PermitComponent} from './permit.component';
import {AddPermitComponent} from './add.permit.component';
import {LayoutModule} from '../../../layouts/layout.module';
import {DefaultComponent} from '../default.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AgmCoreModule} from '@agm/core';
import {CompanyFeesService} from '../fees/_services';
import {RevisionComponent} from './revision.component';
import {RevisionService} from './_services/revision.service';

const routes: Routes = [
  {
    'path': '',
    'component': DefaultComponent,
    'children': [
      {
        'path': '',
        'component': PermitComponent
      },
      {
        'path': 'add',
        'component': AddPermitComponent
      },
      {
        'path': 'revision',
        'component': RevisionComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes), LayoutModule,
    FormsModule, ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCaMqMr5QhuglLcpClt81Euzd3Qg0lUuuY',
      libraries: ['places'],
      language: 'en',
      region: 'US'
    }),
  ], declarations: [
    PermitComponent,
    AddPermitComponent,
    RevisionComponent
  ], providers: [
    CompanyFeesService,
    RevisionService
  ]
})
export class PermitModule {


}
