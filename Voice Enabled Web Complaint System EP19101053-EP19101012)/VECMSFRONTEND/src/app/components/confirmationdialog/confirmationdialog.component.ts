import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirmationdialog',
  templateUrl: './confirmationdialog.component.html',
  styleUrls: ['./confirmationdialog.component.css']
})
export class ConfirmationdialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmationdialogComponent>, @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {

    debugger;
    console.log(this.data);

    if (this.data) {

    }
  }
  Close(verified: any) {
    
    if (verified === 'yes' && this.data.action) {
      this.dialogRef.close('success');
    }
    else
      this.dialogRef.close();
  }

}
