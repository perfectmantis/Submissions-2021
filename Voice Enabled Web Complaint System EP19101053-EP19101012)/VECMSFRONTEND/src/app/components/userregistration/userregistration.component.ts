import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UseregistrationService } from '../../services/useregistration.service';
import { BaseComponent } from '../../helper/BaseComponent';

@Component({
  selector: 'app-userregistration',
  templateUrl: './userregistration.component.html',
  styleUrls: ['./userregistration.component.css']
})
export class UserregistrationComponent extends BaseComponent {

  userregistration: FormGroup;

  hide = true;
  FormFieldIntialize() {
    this.userregistration = this.fb.group({

      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      contactNo: new FormControl(''),
      id: 0
    });
  }
  constructor(private fb: FormBuilder,private _userRegSer : UseregistrationService) {

    super();
    this.FormFieldIntialize();
  }
  IsValid(): boolean {
    return this.userregistration.valid;
  }
  async SubmitUser() {
    debugger;
    if (this.IsValid()) {
      let body = this.userregistration.value; //this.FillFields();
      debugger;
      this._userRegSer.SubmitUserRegistration(body).subscribe(res => {
        if (res.isSuccessful) {
          this.showsucess("Thanks! your account has been succesfully created.", "Ok");
          this.FormFieldIntialize();
        
        }
        error => console.log(error)
      });
    }

  }
  ngOnInit() {
  }

}
