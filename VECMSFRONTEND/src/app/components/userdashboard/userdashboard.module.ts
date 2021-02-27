import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserdashboardComponent } from './userdashboard.component';
import { AuthGuard } from '../../guard/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../../demo-material-module';


const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: UserdashboardComponent }
]


@NgModule({
  declarations: [UserdashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DemoMaterialModule
  ]
  , schemas: [NO_ERRORS_SCHEMA],

})
export class UserdashboardModule { }
