import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../helper/BaseComponent';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent extends BaseComponent {
  userid: any;
  totalApprovedComplaint: Number = 0;
  totalPendingComplaint: Number = 0;
  totalRejectedComplaint: Number = 0;
  totalComplaint: Number = 0;
  usertypeid: any;

  currdate = new Date();
  constructor(private _admin: AdminService) {
    super();
    this.userid = this.localcontent['userid'];
    this.usertypeid = this.localcontent['usertypeid'];
  }
  async GetUserDashboardData() {

    this._admin.GetUserDashboardData(this.userid).subscribe(result => {
      if (result.isSuccessful) {
        console.log("Data", result.data);

        this.totalApprovedComplaint = result.data.table[0].totalApprovedComplaint;
        this.totalPendingComplaint = result.data.table1[0].totalPendingComplaint;
        this.totalRejectedComplaint = result.data.table2[0].totalRejectedComplaint;
        this.totalComplaint = result.data.table3[0].totalComplaint;

      }
      else {
        this.showSnakMessage(result.errors, "Ok");
      }
    });
  }

  async GetCompanyUserDashboardData() {

    this._admin.GetCompanyUserDashboardData(this.userid).subscribe(result => {
      if (result.isSuccessful) {
        console.log("Data", result.data);

        this.totalApprovedComplaint = result.data.table[0].totalApprovedComplaint;
        this.totalPendingComplaint = result.data.table1[0].totalPendingComplaint;
        this.totalRejectedComplaint = result.data.table2[0].totalRejectedComplaint;
        this.totalComplaint = result.data.table3[0].totalComplaint;

      }
      else {
        this.showSnakMessage(result.errors, "Ok");
      }
    });
  }


  ngOnInit() {
    debugger;
    if (this.userid && this.usertypeid === 2)
      this.GetUserDashboardData();
    if (this.userid && this.usertypeid === 3)
      this.GetCompanyUserDashboardData();
  }

}
