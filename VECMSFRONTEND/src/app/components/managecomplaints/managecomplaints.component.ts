import { Component, OnInit } from '@angular/core';
import { RegistercomplaintService } from '../../services/registercomplaint.service';
import { BaseComponent } from '../../helper/BaseComponent';
import { MatTabChangeEvent } from '@angular/material';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-managecomplaints',
  templateUrl: './managecomplaints.component.html',
  styleUrls: ['./managecomplaints.component.css']
})
export class ManagecomplaintsComponent extends BaseComponent {
  ComplaintData: any;
  ComplaintApprovedData: any;
  ComplaintPendingData: any;
  ComplaintRejectedData: any;
  totalApprovedComplaint: Number = 0;
  totalPendingComplaint: Number = 0;
  totalRejectedComplaint: Number = 0;
  usertypeid: any = isNullOrUndefined;
  userid: any;

  constructor(private _RegcomSer: RegistercomplaintService) {
    super();
  }

  async ngOnInit() {
    this.usertypeid = this.localcontent['usertypeid'];
    this.userid = this.localcontent['userid'];
    if (this.usertypeid === 1)
      this.userid = 0;

    

    await this.GetComplaintDataByStatus(1, this.userid);
    //await this.GetComplaintDataByStatus(2, this.userid);
    //await this.GetComplaintDataByStatus(3, this.userid);

  }

  GetComplaintDataByStatus(ComplaintStatusId: number, UserId: any) {
    if (ComplaintStatusId) {
      this._RegcomSer.GetComplaintDataByStatus(ComplaintStatusId, UserId).subscribe(result => {
        if (result.isSuccessful) {
          if (ComplaintStatusId === 1) {
            debugger;
            this.ComplaintApprovedData = result.data.table;
            this.totalApprovedComplaint = result.data.table1[0].totalApprovedComplaint;
            this.totalPendingComplaint = result.data.table2[0].totalPendingComplaint;
            this.totalRejectedComplaint = result.data.table3[0].totalRejectedComplaint;
            console.log("Approved", this.ComplaintApprovedData);
          }
          else if (ComplaintStatusId === 2) {
            debugger;
            this.ComplaintPendingData = result.data.table;
            this.totalPendingComplaint = result.data.table2[0].totalPendingComplaint;
            console.log("Pending", this.ComplaintPendingData);
          }
          else if (ComplaintStatusId === 3) {
            this.ComplaintRejectedData = result.data.table;
            this.totalRejectedComplaint = result.data.table3[0].totalRejectedComplaint;
            console.log("Pending", this.ComplaintRejectedData);
          }
          // this._RegcomSer.ComplaintTypeDataByUser = result.data;
        }
        else {
          this.showSnakMessage(result.errors, "Ok");
        }
      })
    }
  }
  GetComplaintPendingDataByStatus(ComplaintStatusId: number, UserId: any) {

    if (ComplaintStatusId === 2) {
      debugger;
      this._RegcomSer.GetComplaintDataByStatus(ComplaintStatusId, UserId).subscribe(result => {
        this.ComplaintPendingData = result.data.table;
        this.totalPendingComplaint = result.data.table2[0].totalPendingComplaint
        console.log("Pending", this.ComplaintPendingData);

      })
    }
  }
  GetComplaintRejectedDataByStatus(ComplaintStatusId: number, UserId: any) {

    if (ComplaintStatusId === 3) {
      debugger;
      this._RegcomSer.GetComplaintDataByStatus(ComplaintStatusId, UserId).subscribe(result => {

        this.ComplaintRejectedData = result.data.table;
        this.totalRejectedComplaint = result.data.table3[0].totalRejectedComplaint;
        console.log("Pending", this.ComplaintRejectedData);
      })
    }
  }

  // GetComplaintApprovedDataByStatus(ComplaintStatusId: number) {
  //   if (ComplaintStatusId) {
  //     this._RegcomSer.GetComplaintDataByStatus(ComplaintStatusId).subscribe(result => {
  //       if (result.isSuccessful) {

  //         debugger;
  //         this.ComplaintApprovedData = result.data.table;
  //         this.totalApprovedComplaint = result.data.table2[0].totalApprovedComplaint
  //         console.log("Approved", this.ComplaintApprovedData);

  //       }
  //       else {
  //         this.showSnakMessage(result.errors, "Ok");
  //       }
  //     })
  //   }
  // }

  // TabChange($event: MatTabChangeEvent) {
  //   debugger;
  //   if ($event.index === 1) {
  //     this.GetComplaintPendingDataByStatus(2); ///pending
  //   }
  //   else if ($event.index === 2) {
  //     this.GetComplaintRejectedDataByStatus(3); ///rejected
  //   }
  //   else {
  //     this.GetComplaintApprovedDataByStatus(1);  //Approved
  //   }
  // }

  TabChange($event: MatTabChangeEvent) {
    //   debugger;
    if ($event.index === 1) {
      this.GetComplaintDataByStatus(2, this.userid); ///pending
    }
    else if ($event.index === 2) {
      this.GetComplaintDataByStatus(3, this.userid); ///rejected
    }
    else {
      this.GetComplaintDataByStatus(1, this.userid);  //Approved
    }
  }
  onCellPrepared(e) {

    if (e.rowType === "data" && e.column.dataField === "complaintStatus") {
      if (e.rowType == "data") {

        var data = e.value;
        if (data == 'Pending') {
          e.cellElement.style.backgroundColor = "#e1d949e8";
          e.cellElement.style.color = "black";
        }
        else if (data == 'Approved') {
          e.cellElement.style.color = "white";
          e.cellElement.style.backgroundColor = "lightgreen";
        }
        else {
          e.cellElement.style.backgroundColor = "red";
          e.cellElement.style.color = "white";
        }

      }

    }

  }

  NavigateDetail(obj) {
    //  debugger;

    if (obj)
      // this._RegcomSer.ComplaintDetailDataAdmin = obj.key
      this.NavigateParam('/managecomplaints/detail', obj.key.id);
  }
}
