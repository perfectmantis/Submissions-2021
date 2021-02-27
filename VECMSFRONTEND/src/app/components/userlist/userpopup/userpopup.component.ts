import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BaseComponent } from '../../../helper/BaseComponent';
import { StateService } from '../../../services/state.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UseregistrationService } from '../../../services/useregistration.service';

@Component({
  selector: 'app-userpopup',
  templateUrl: './userpopup.component.html',
  styleUrls: ['./userpopup.component.css']
})
export class UserpopupComponent extends BaseComponent {
  UserForm: FormGroup;
  AllStateData: any;
  StateData: any;
  userid: any;
  UserTypeData: any;
  FormFieldIntialize() {
    this.UserForm = this.fb.group({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      contactNo: new FormControl(''),
      address: new FormControl(''),
      stateId: new FormControl('', Validators.required),
      companyName: new FormControl('', Validators.required),
      pinCode: new FormControl(''),
      password: new FormControl(''),
      userTypeId: new FormControl(''),
      isApproved: new FormControl(''),
      addBy: new FormControl(''),
      id: 0
    });
  }
  constructor(private fb: FormBuilder, private _userRegSer: UseregistrationService, private _stateSer: StateService, public dialogRef: MatDialogRef<UserpopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
    this.FormFieldIntialize();
  }
  header: string = "Add User";
  async GetStateData() {

    this.AllStateData = this._stateSer.GetStateData().subscribe(result => {
      if (result.isSuccessful) {
        this.StateData = result.data;
      }
      else {
        this.showSnakMessage(result.errors, "Ok");
      }
    });
  }

  GetUserType() {

    this._userRegSer.GetUserType().subscribe(result => {
      if (result.isSuccessful) {
        this.UserTypeData = result.data;
      }
      else {
        this.showSnakMessage(result.errors, "Ok");
      }
    });
  }
  GetLocalStorageItem() {
    const localstoragedata = localStorage.getItem('appkey');
    this.localcontent = JSON.parse(localstoragedata);
  }
  ngOnInit() {
    this.GetLocalStorageItem();
    this.userid = this.localcontent['userid'];
    this.GetStateData();
    this.GetUserType();


    if (this.data) {
      debugger;
      //  let result = this.data;
      this.UserForm.patchValue({
        contactNo: this.data.contactNo,
        email: this.data.email,
        fullName: this.data.fullName,
        password: this.data.password,
        address: this.data.address,
        stateId: this.data.stateId,
        companyName: this.data.companyName,
        pinCode: this.data.pinCode,
        isApproved: this.data.isApproved,
        userTypeId: this.data.userTypeId,
        id: this.data.id,


      });
    }
  }

  Close() {
    this.dialogRef.close();
  }
  IsValid(): boolean {
    return this.UserForm.valid;
  }
  async SubmitUserRegistration() {
    debugger;
    if (this.IsValid()) {
      if (this.userid)
        this.UserForm.controls['addBy'].setValue(this.userid);
      let body = this.UserForm.value; //this.FillFields();
      debugger;
      this._userRegSer.SubmitUserRegistration(body).subscribe(res => {
        if (res.isSuccessful) {
          this.Close();
          this.showsucess("Saved Successfully.", "Ok");


        }
        error => console.log(error)
      });
    }
  }

}
