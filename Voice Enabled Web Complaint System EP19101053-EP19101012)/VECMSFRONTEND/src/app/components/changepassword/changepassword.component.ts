import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BaseComponent } from '../../helper/BaseComponent';
import { UseregistrationService } from '../../services/useregistration.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent extends BaseComponent {
  ChangePassword: FormGroup;
  userid: any;
  constructor(private fb: FormBuilder, private _userRegSer: UseregistrationService) {

    super();
    this.FormFieldIntialize();
  }
  FormFieldIntialize() {
    this.ChangePassword = this.fb.group({
      CurrentPassword: new FormControl('', Validators.required),
      NewPassword: new FormControl('', Validators.required),
      ConfirmPassword: new FormControl('', Validators.required)
    });
  }
  ngOnInit() {
    this.userid = this.localcontent['userid'];
  }

  IsValid(): boolean {
    return this.ChangePassword.valid;
  }

  Addnew() {
    this.FormFieldIntialize();
  }
  async Submit() {
    debugger;


    let OldPassword = this.ChangePassword.controls['CurrentPassword'].value;
    let NewPass = this.ChangePassword.controls['NewPassword'].value;
    let ConfirmPass = this.ChangePassword.controls['ConfirmPassword'].value;
    if (this.IsValid()) {
      if (NewPass === ConfirmPass) {
        let body = this.ChangePassword.value; //this.FillFields();
        debugger;
        this._userRegSer.UpdateUserRegistration(this.userid, OldPassword, NewPass).subscribe(res => {
          if (res.isSuccessful) {
            this.showsucess(res.data, "Ok");
            this.Addnew();
          }
          else {
            this.showSnakMessage(res.errors);
          
          }
          error => console.log(error)
        });
      }
      else
        this.showSnakMessage('New password and confirm password should be same!', "Ok")
    }

  }

}
