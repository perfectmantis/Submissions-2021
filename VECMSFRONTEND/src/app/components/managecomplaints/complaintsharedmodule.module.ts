import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintconfirmationdialogComponent } from '../complaintconfirmationdialog/complaintconfirmationdialog.component';
import { DemoMaterialModule } from '../../demo-material-module';
import { AssigncomplaintsdialogComponent } from './assigncomplaintsdialog/assigncomplaintsdialog.component';



@NgModule({
  declarations: [ComplaintconfirmationdialogComponent,AssigncomplaintsdialogComponent],
  imports: [
    CommonModule,DemoMaterialModule,
  ],
  exports: [ComplaintconfirmationdialogComponent],
  entryComponents: [ComplaintconfirmationdialogComponent,AssigncomplaintsdialogComponent],schemas: [NO_ERRORS_SCHEMA],
})
export class ComplaintsharedmoduleModule { }
