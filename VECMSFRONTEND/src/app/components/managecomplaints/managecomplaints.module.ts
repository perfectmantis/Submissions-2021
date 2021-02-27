import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagecomplaintsComponent } from './managecomplaints.component';
import { Routes, RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../../demo-material-module';
import { ViewdetailsComponent } from './viewdetails/viewdetails.component';
import { ComplaintsharedmoduleModule } from './complaintsharedmodule.module';
import { ComplaintconfirmationdialogComponent } from '../complaintconfirmationdialog/complaintconfirmationdialog.component';
import { AssigncomplaintsdialogComponent } from './assigncomplaintsdialog/assigncomplaintsdialog.component';
// const routes: Routes = [{
//   path: '', component: ManagecomplaintsComponent
// },
// {
//   path: 'detail',
//   component: ViewdetailsComponent
// }
// ]


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ManagecomplaintsComponent },
      { path: 'detail/:id', component: ViewdetailsComponent },

      { path: '**', redirectTo: '' }
    ]
  }
]

// { path: '**', redirectTo: '' }



@NgModule({
  declarations: [ManagecomplaintsComponent, ViewdetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DemoMaterialModule,
    ComplaintsharedmoduleModule
  ], schemas: [NO_ERRORS_SCHEMA],

})
export class ManagecomplaintsModule { }
