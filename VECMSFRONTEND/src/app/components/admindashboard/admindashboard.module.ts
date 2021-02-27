import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmindashboardComponent } from './admindashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule, DxTemplateModule, DxChartModule } from 'devextreme-angular';
import { DemoMaterialModule } from '../../demo-material-module';
import { AuthGuard } from '../../guard/auth.guard';



const routes: Routes = [
  { path : '', canActivate:[AuthGuard],component : AdmindashboardComponent }
]


@NgModule({
  declarations: [AdmindashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DemoMaterialModule
  ]
  , schemas: [NO_ERRORS_SCHEMA],
  
})
export class AdmindashboardModule { }
