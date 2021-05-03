import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, Inject } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RegistercomplaintService } from '../../services/registercomplaint.service';
import { BaseComponent } from '../../helper/BaseComponent';

@Component({
  selector: 'app-complaintconfirmationdialog',
  templateUrl: './complaintconfirmationdialog.component.html',
  styleUrls: ['./complaintconfirmationdialog.component.css']
})
export class ComplaintconfirmationdialogComponent extends BaseComponent {
  ComplaintConfirmForm: FormGroup;
  ConfirmStatusData = [{
    id: 1,
    name: "Approved"
  },
  {
    id: 3,
    name: "Rejected"
  }
  ]
  compaintid: any;
  userId: any;
  FormFieldIntialize() {
    this.ComplaintConfirmForm = this.fb.group({
      complaintNo: new FormControl(''),
      complaintStatusId: new FormControl(''),
      complaintRemarks: new FormControl(''),
      editBy: new FormControl(''),
      // addBy: new FormControl(''),
      id: 0
    });
  }
  // @ViewChild('target', { read: ViewContainerRef, static: true }) vcRef: ViewContainerRef;

  // componentRef: ComponentRef<any>;
  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<ComplaintconfirmationdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _RegComplaint: RegistercomplaintService) {
    super();
    this.FormFieldIntialize();

  }
  // constructor(private fb: FormBuilder,
  //   private resolver: ComponentFactoryResolver,
  //   @Inject(MAT_DIALOG_DATA) public data: any,private _RegComplaint : RegistercomplaintService) {
  //   this.FormFieldIntialize();

  // }

  ngOnInit() {

    this.userId = this.localcontent['userid'];
    if (this.data) {
      this.ComplaintConfirmForm.controls['complaintNo'].setValue(this.data.complaintNo);
      this.compaintid = this.data.compaintid;
      this.ComplaintConfirmForm.controls['id'].setValue(this.data.compaintid);
      this.ComplaintConfirmForm.controls['editBy'].setValue(this.userId);

    }

    // console.log(this.data);
    // const factory = this.resolver.resolveComponentFactory(this.data.component);
    // this.componentRef = this.vcRef.createComponent(factory);
  }
  ngOnDestroy() {
    // if (this.componentRef) {
    //   this.componentRef.destroy();
    // }
  }
  Close() {
    this.dialogRef.close();
  }
  IsValid(): boolean {
    return this.ComplaintConfirmForm.valid;
  }
  SubmitRegisterComplaint() {
    debugger;
    if (this.IsValid()) {
      let body = this.ComplaintConfirmForm.value;

      debugger;
      this._RegComplaint.UpdateComplaint(body).subscribe(res => {
        if (res.isSuccessful) {
          this.showsucess(res.data, "Ok");
          this.dialogRef.close("ture");
        }
        error => console.log(error)
      });
    }
  }
}
