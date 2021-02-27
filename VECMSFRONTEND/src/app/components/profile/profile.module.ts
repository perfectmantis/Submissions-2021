import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule, DxTemplateModule } from 'devextreme-angular';
import { DemoMaterialModule } from '../../demo-material-module';
import { SafePipe } from '../../helper/SafeUrl';



const routes: Routes = [
  { path: '', component: ProfileComponent }
]



@NgModule({
  declarations: [ProfileComponent,SafePipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DemoMaterialModule,
    
  ]
  , schemas: [NO_ERRORS_SCHEMA],
  exports: [SafePipe]
})
export class ProfileModule { }
