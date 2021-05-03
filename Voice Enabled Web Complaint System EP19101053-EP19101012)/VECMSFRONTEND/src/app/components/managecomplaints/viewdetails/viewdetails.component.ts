import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../helper/BaseComponent';
import { RegistercomplaintService } from '../../../services/registercomplaint.service';
import { MatDialog } from '@angular/material';
import { ComplaintconfirmationdialogComponent } from '../../complaintconfirmationdialog/complaintconfirmationdialog.component';
import { ConfirmationdialogComponent } from '../../confirmationdialog/confirmationdialog.component';
import { ActivatedRoute } from '@angular/router';
import { AssigncomplaintsdialogComponent } from '../assigncomplaintsdialog/assigncomplaintsdialog.component';

@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.component.html',
  styleUrls: ['./viewdetails.component.css']
})
export class ViewdetailsComponent extends BaseComponent {
  complaintNo: any;
  registrationDate: any;
  categoryName: any;
  subCategoryName: any;
  complaintType: any;
  stateName: any;
  complaintNature: any;
  complaintDocPath: any;
  complaintWord: any;
  complaintStatus: any;
  complaintDocName: any;
  complainantName: any;
  IsTakeActionShow: boolean = false;
  compaintid: any;
  ComplaintDetailData: any;
  complaintRemarks: any = null;
  complaintAssignedTo: any;
  usertypeid: any;
  userid: any;
  IsAssignShow: boolean = false;

  constructor(private _RegcomSer: RegistercomplaintService, private dialog: MatDialog, private activeroute: ActivatedRoute) {
    super();
  }

  async GetComplaintDataById(Id) {
    if (Id) {
      this._RegcomSer.GetComplaintDataById(Id).subscribe(result => {
        if (result.isSuccessful) {
          this.ComplaintDetailData = result.data;
          if (this.ComplaintDetailData) {
            debugger;
            // this.compaintid
            this.complaintNo = this.ComplaintDetailData[0].complaintNo;
            this.complainantName = this.ComplaintDetailData[0].fullName;
            this.registrationDate = this.ComplaintDetailData[0].registrationDate;
            this.categoryName = this.ComplaintDetailData[0].categoryName;
            this.subCategoryName = this.ComplaintDetailData[0].subCategoryName;
            this.complaintType = this.ComplaintDetailData[0].complaintType;
            this.stateName = this.ComplaintDetailData[0].stateName;
            this.complaintNature = this.ComplaintDetailData[0].complaintNature;
            this.complaintDocPath = this.ComplaintDetailData[0].complaintDocPath;
            this.complaintWord = this.ComplaintDetailData[0].complaintWord;
            this.complaintStatus = this.ComplaintDetailData[0].complaintStatus;
            this.complaintDocName = this.ComplaintDetailData[0].complaintDocName;
            this.complaintRemarks = this.ComplaintDetailData[0].complaintRemarks;
            this.complaintAssignedTo = this.ComplaintDetailData[0].assignedTo;
            if (this.complaintStatus.toLowerCase() === 'pending' || this.ComplaintDetailData[0].complaintAssignedTo == null) {
              this.IsTakeActionShow = true;
              this.IsAssignShow = true;
            }

            else {
              this.IsTakeActionShow = false;
              this.IsAssignShow = false;
            }
            if (this.usertypeid !== 1) {
              this.IsAssignShow = false;
              this.complaintAssignedTo = ''; 
            }

            if(this.complaintAssignedTo)
            {
              this.IsTakeActionShow = false;
              this.IsAssignShow = false;
            }

          }
        }
        else {
          this.showSnakMessage(result.errors, "Ok");
        }
      });
    }


  }
  async ngOnInit() {

    debugger;
    this.compaintid = this.activeroute.snapshot.paramMap.get('id');
    this.usertypeid = this.localcontent['usertypeid'];
    this.userid = this.localcontent['userid'];

    if (this.compaintid) {
      await this.GetComplaintDataById(this.compaintid);

    }







  }
  DownloadFile() {
    debugger;
    if (this.complaintDocName) {
      this._RegcomSer.DownloadFile(this.complaintDocName);
    }
  }

  getcolor() {
    if (this.complaintStatus.toLowerCase() === 'approved')
      return { 'color': 'lightgreen', 'font-weight': '600' };
    else if (this.complaintStatus.toLowerCase() === 'pending')
      return { 'color': '#e1d949e8', 'font-weight': '600' };
    else
      return { 'color': 'red', 'font-weight': '600' };
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(ComplaintconfirmationdialogComponent, {
      data: { complaintNo: this.complaintNo, compaintid: this.compaintid }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res)
        this.GetComplaintDataById(this.compaintid);
    })
  }
  openAssignDialog(): void {
    let dialogRef = this.dialog.open(AssigncomplaintsdialogComponent, {
      data: { ComplainData: this.ComplaintDetailData, compaintid: this.compaintid }, disableClose: true

    },

    );
    dialogRef.afterClosed().subscribe(res => {
      if (res)
        this.GetComplaintDataById(this.compaintid);
    })
  }


}


