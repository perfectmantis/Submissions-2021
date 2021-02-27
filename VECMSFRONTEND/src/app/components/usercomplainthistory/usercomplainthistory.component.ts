import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../helper/BaseComponent';
import { RegistercomplaintService } from '../../services/registercomplaint.service';

@Component({
  selector: 'app-usercomplainthistory',
  templateUrl: './usercomplainthistory.component.html',
  styleUrls: ['./usercomplainthistory.component.css']
})
export class UsercomplainthistoryComponent extends BaseComponent {
  userid: any;
  ComplaintTypeData: any;

  constructor(private _RegcomSer: RegistercomplaintService) {
    super();
  }

  GetComplaintDataByUser() {
    this._RegcomSer.GetComplaintDataByUser(this.userid).subscribe(result => {
      if (result.isSuccessful) {
        this.ComplaintTypeData = result.data;
        // this._RegcomSer.ComplaintTypeDataByUser = result.data;
      }
      else {
        this.showSnakMessage(result.errors, "Ok");
      }
    })
  }
  GetLocalStorageItem() {
    const localstoragedata = localStorage.getItem('appkey');
    this.localcontent = JSON.parse(localstoragedata);
  }
  ngOnInit() {
    debugger;
    this.GetLocalStorageItem();
    this.userid = this.localcontent['userid'];
    this.GetComplaintDataByUser();
  }

  onCellPrepared(e) {
    debugger;


    if (e.rowType === "data" && e.column.dataField === "complaintStatus") {
      if (e.rowType == "data") {
        debugger;
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

    if (e.rowType === "data" && e.column.dataField === "Temp") {
      if (e.rowType == "data") {
        debugger;
        var data1 = e.value;



        if (data1 >= 36.5 && data1 <= 37.3)
          e.cellElement.style.backgroundColor = "lightgreen";
        else
          e.cellElement.style.backgroundColor = "red";


      }

    } 

  }
  NavigateDetail(obj) {
    debugger;
    // this.NavigateParam('/complaintdetail', 10);
    if (obj)
      this._RegcomSer.ComplaintTypeDataByUser = obj.key
    this.Navigate('/complainthistory/complaintdetail');
  }
}
