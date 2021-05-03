import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubcategoryComponent } from './subcategory.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule, DxTemplateModule } from 'devextreme-angular';
import { DemoMaterialModule } from '../../demo-material-module';

const routes: Routes = [{
  path: '', component: SubcategoryComponent
}]

@NgModule({
  declarations: [SubcategoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DemoMaterialModule
  ]
  , schemas: [NO_ERRORS_SCHEMA],
 
})
export class SubcategoryModule { }
