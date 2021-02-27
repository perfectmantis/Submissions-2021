import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangepasswordComponent } from './changepassword.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../../demo-material-module';

const routes: Routes = [
  { path: '', component: ChangepasswordComponent }
]

@NgModule({
  declarations: [ChangepasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DemoMaterialModule
  ], schemas: [NO_ERRORS_SCHEMA]
})
export class ChangepasswordModule { }
