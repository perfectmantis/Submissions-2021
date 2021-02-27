import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateComponent } from './state.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule, DxTemplateModule } from 'devextreme-angular';
import { DemoMaterialModule } from '../../demo-material-module';


const routes: Routes = [  
  { path : '', component : StateComponent }
]


@NgModule({
  declarations: [StateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DemoMaterialModule
  ]
  , schemas: [NO_ERRORS_SCHEMA],
  
})
export class StateModule { }
