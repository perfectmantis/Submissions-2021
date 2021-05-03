import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsercomplainthistoryComponent } from './usercomplainthistory.component';
import { Routes, RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../../demo-material-module';
import { UsercomplaintdetailComponent } from './usercomplaintdetail/usercomplaintdetail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: UsercomplainthistoryComponent },
      { path: 'complaintdetail', component: UsercomplaintdetailComponent },

      { path: '**', redirectTo: '' }
    ]
  }
]
@NgModule({
  declarations: [UsercomplainthistoryComponent, UsercomplaintdetailComponent],
  imports: [
    CommonModule, DemoMaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class UsercomplainthistoryModule { }
