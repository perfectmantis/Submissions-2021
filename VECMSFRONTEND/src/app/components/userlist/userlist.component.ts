import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../helper/BaseComponent';
import { UseregistrationService } from '../../services/useregistration.service';
import { UserpopupComponent } from './userpopup/userpopup.component';
import { MatDialog } from '@angular/material';
import { ConfirmationdialogComponent } from '../confirmationdialog/confirmationdialog.component';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent extends BaseComponent {
  UserData: any;

  constructor(private _userRegSer: UseregistrationService, private Dialog: MatDialog) {
    super();
  }
  GetUsers() {
    this._userRegSer.GetUserRegistationData().subscribe(result => {
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
  }
  AddNewUser() {
    let dialogref = this.Dialog.open(UserpopupComponent, { disableClose: true });
    dialogref.afterClosed().subscribe(res => {
      this.GetUsers();
    });
  }


  EditUser(obj) {


    let EditUserdata = obj.key;
    debugger;
    if (EditUserdata) {
      let dialogref = this.Dialog.open(UserpopupComponent, {
        data: EditUserdata, disableClose: true
      });

      dialogref.afterClosed().subscribe(res => {
      
          this.GetUsers();
          EditUserdata = null;
        
      });
    }
  }


  DeleteUserRegistrationData(obj) {
    debugger;
    let Id = obj.key.id;
    if (Id) {
      debugger;
      let dialogref = this.MatDialog.open(ConfirmationdialogComponent, { data: { action: Id }, minWidth: '300px', disableClose: true });
      dialogref.afterClosed().subscribe(result => {
        if (result) {
          {
            this._userRegSer.DeleteUserRegistrationData(Id).subscribe(result => {
              if (result.isSuccessful) {
                this.GetUsers();

              }
              else {
                this.showSnakMessage(result.errors, "Ok");
              }
            });
          }
        }
      })
    }

  }
}
