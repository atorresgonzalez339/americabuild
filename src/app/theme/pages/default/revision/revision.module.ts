import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {LayoutModule} from '../../../layouts/layout.module';
import {DefaultComponent} from '../default.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AgmCoreModule} from '@agm/core';
import {ListrevisionComponent} from './listrevision.component';
import {RevisionService} from './_services/revision.service';
import {DataTableModule} from 'primeng/datatable';
import {AddRevisionComponent} from './add.revision.component';

const routes: Routes = [
  {
    'path': '',
    'component': DefaultComponent,
    'children': [
      {
        'path': 'list/:id',
        'component': ListrevisionComponent
      },
      {
        'path': 'add/:id',
        'component': AddRevisionComponent
      },
      {
        'path': 'edit/:id/:idPermitRevision',
        'component': AddRevisionComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule
  ],
  declarations: [
    ListrevisionComponent,
    AddRevisionComponent
  ],
  providers: [
    RevisionService
  ]
})
export class RevisionModule {


}
