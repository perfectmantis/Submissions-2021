import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { BaseComponent } from '../../helper/BaseComponent';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent extends BaseComponent {
  totalApprovedComplaint: Number = 0;
  totalPendingComplaint: Number = 0;
  totalRejectedComplaint: Number = 0;
  totalComplaint: Number = 0;
  usertypeid: any;
  totalchartdata: any;


  
  async GetAdminDashboardData() {

    this._admin.GetAdminDashboardData().subscribe(result => {
      if (result.isSuccessful) {
        console.log("Data",result.data);

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

  async GetCompanyChart() {

    this._admin.GetCompanyChart().subscribe(result => {
      if (result.isSuccessful) {
        console.log("Data",result.data);

        this.totalchartdata = result.data;//totalComplaint;
        console.log("Chart", this.totalchartdata)
      }
      else {
        this.showSnakMessage(result.errors, "Ok");
      }
    });
  }
  constructor(private _admin : AdminService) {
    super();
    this.GetAdminDashboardData();

    this.usertypeid = this.localcontent['usertypeid'];
    if(this.usertypeid === 2 || this.usertypeid === 3)
    this.Navigate('/userdashboard');
    // if(this.usertypeid === 3)
    // this.Navigate('/companyuserdashboard');
    this.GetCompanyChart();
  }
  grossProductData: GrossProduct[] = [{
    state: "Illinois",
    year1998: 423.721,
    year2001: 476.851,
    year2004: 528.904
  }, {
    state: "Indiana",
    year1998: 178.719,
    year2001: 195.769,
    year2004: 227.271
  }, {
    state: "Michigan",
    year1998: 308.845,
    year2001: 335.793,
    year2004: 372.576
  }, {
    state: "Ohio",
    year1998: 348.555,
    year2001: 374.771,
    year2004: 418.258
  }, {
    state: "Wisconsin",
    year1998: 160.274,
    year2001: 182.373,
    year2004: 211.727
  }];
  currdate = new Date();
  ngOnInit() {
  }
  onPointClick(e) {
    e.target.select();
}

}

export class GrossProduct {
  state: string;
  year1998: number;
  year2001: number;
  year2004: number;
}
