import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule } from '@angular/material';
// import { DxDataGridModule, DxTemplateModule } from 'devextreme-angular';
import { CategoryComponent } from './category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule, DxTemplateModule } from 'devextreme-angular';
import { DemoMaterialModule } from '../../demo-material-module';

const routes: Routes = [
  { path : '', component : CategoryComponent }
]


@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    // MatButtonModule,      
    // MatFormFieldModule,
    // MatInputModule,
    // FormsModule,
    // ReactiveFormsModule,
    // MatIconModule,
    // DxDataGridModule,
    // DxTemplateModule,
    // MatCardModule,
    DemoMaterialModule
  ]
  , schemas: [NO_ERRORS_SCHEMA],
  
})
export class CategoryModule { }
