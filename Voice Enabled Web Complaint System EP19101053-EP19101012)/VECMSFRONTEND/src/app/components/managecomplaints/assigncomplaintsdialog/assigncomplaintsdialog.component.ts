import { Component, OnInit, Inject } from '@angular/core';
import { BaseComponent } from '../../../helper/BaseComponent';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { UseregistrationService } from '../../../services/useregistration.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RegistercomplaintService } from '../../../services/registercomplaint.service';

@Component({
  selector: 'app-assigncomplaintsdialog',
  templateUrl: './assigncomplaintsdialog.component.html',
  styleUrls: ['./assigncomplaintsdialog.component.css']
})
export class AssigncomplaintsdialogComponent extends BaseComponent {
  AssignComplaintForm: FormGroup;
  UserData: any;
  compaintid: any;
  userid: any;
  FormFieldIntialize() {
    this.AssignComplaintForm = this.fb.group({
      complaintNo: new FormControl(''),
      complaintDate: new FormControl(''),
      complaintNature: new FormControl(''),
      complaintAssignedTo: 0,
      editBy : 0,
      id: 0

    });
  }
  constructor(private fb: FormBuilder, private _userRegSer: UseregistrationService, private _RegComplaint: RegistercomplaintService
    , public dialogRef: MatDialogRef<AssigncomplaintsdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    super();
    this.FormFieldIntialize();
  }
  GetUsers() {
    this._userRegSer.GetCompanyUsers().subscribe(result => {
      if (result.isSuccessful) {
        this.UserData = result.data;
        // this._RegcomSer.ComplaintTypeDataByUser = result.data;
      }
      else {
        this.showSnakMessage(result.errors, "Ok");
      }
    })
  }

  ngOnInit() {
    this.GetUsers();
    this.userid = this.localcontent['userid'];
    if (this.data) {
      debugger;
      this.AssignComplaintForm.controls['complaintNo'].setValue(this.data.ComplainData[0].complaintNo);
      this.AssignComplaintForm.controls['complaintNature'].setValue(this.data.ComplainData[0].complaintNature);
      this.AssignComplaintForm.controls['complaintDate'].setValue(this.data.ComplainData[0].registrationDate);
      this.compaintid = this.data.compaintid;
      this.AssignComplaintForm.controls['id'].setValue(this.data.compaintid);
      this.AssignComplaintForm.controls['editBy'].setValue(this.userid);
    }
  }
  SelectedRow(obj) {     
    if (obj) {
      debugger;
      let UserId = obj.id;
      if (UserId)
        this.AssignComplaintForm.controls['complaintAssignedTo'].setValue(UserId);

    }
  }
  Close() {
    this.dialogRef.close();
  }
  IsValid(): boolean {
    return this.AssignComplaintForm.valid;
  }
  AssignRegisterComplaint() {
    debugger;
    if (this.IsValid()) {
      let body = this.AssignComplaintForm.value;

      debugger;
      this._RegComplaint.AssignComplaint(body).subscribe(res => {
        if (res.isSuccessful) {
          this.showsucess(res.data, "Ok");
          this.dialogRef.close("true");
        }
        error => console.log(error)
      });
    }
  }
}
