import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserlistComponent } from './userlist.component';
import { Routes, RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../../demo-material-module';
import { UserpopupComponent } from './userpopup/userpopup.component';



const routes: Routes = [{
  path: '', component: UserlistComponent
}]

@NgModule({
  declarations: [UserlistComponent, UserpopupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DemoMaterialModule,
  ], entryComponents: [UserpopupComponent]
  , schemas: [NO_ERRORS_SCHEMA],

})
export class UserlistModule { }
