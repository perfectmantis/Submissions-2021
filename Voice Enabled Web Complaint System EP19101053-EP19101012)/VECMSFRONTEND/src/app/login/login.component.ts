import { Component, OnInit, DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { BaseComponent } from '../helper/BaseComponent';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent {
  login: FormGroup;
  IsLogin: boolean = false;
  hide = true;
  Ischecked:boolean = false;
  usertypeid: any;
  constructor( private fb: FormBuilder, private _loginSer: LoginService, private _authSer: AuthService) {
    super();
    this.login = fb.group({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      agree: false

    });

  }

  ngOnInit() {
  }
  Login() {
    debugger;
    this.IsLogin = true;
    let username = this.login.controls['login'].value;
    let password = this.login.controls['password'].value;
    // let enums = Enums.Status.new
    this._loginSer.GetUserVerification(username, password).subscribe(result => {
    debugger;
      console.log(result);
      if (result.isSuccessful) {

        let data = result.data;
        if (this._authSer.checkUserNameAndPass(result.isSuccessful,data,this.Ischecked,result.data.imageName)) {
          this.Navigate('');
          // this.GetLocalStorageItem();
          // this.usertypeid = this.localcontent['usertypeid'];
          // debugger;
          // this._loginSer.GetScreens(this.usertypeid).subscribe(result => {
          //   debugger;
          //     console.log(result);
          //     if (result.isSuccessful) {
          //     //   let menu =  JSON.stringify(result.data)
          //     //    localStorage.setItem('Menu', menu);
          //     this._loginSer.MENUITEMS = result.data;
          //        this.usertypeid=0;
          //     }
          //   })
          
        }
        

      }
      else {
        this.showSnakMessage(result.errors, "Ok");
      }
    });
    this.IsLogin = false;
  }
}
