import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RegistercomplaintService } from '../../../services/registercomplaint.service';
import { Observable } from 'rxjs';
import { GlobalConfig } from '../../../helper/GlobalConfig';

import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-usercomplaintdetail',
  templateUrl: './usercomplaintdetail.component.html',
  styleUrls: ['./usercomplaintdetail.component.css']
})
export class UsercomplaintdetailComponent implements OnInit {

  Complaintdetail: FormGroup;
  Companydetail = [];
  Url: string;
  complaintDocName: any;
  constructor(private fb: FormBuilder, private _RegcomSer: RegistercomplaintService, private http: HttpClient) {
    this.Complaintdetail = fb.group({
      complaintNo: new FormControl(""),
      registrationDate: new FormControl(""),
      categoryName: new FormControl(""),
      subCategoryName: new FormControl(""),
      complaintType: new FormControl(""),
      stateName: new FormControl(""),
      complaintNature: new FormControl(""),
      // complaintDocPath: new FormControl(""),
      complaintWord: new FormControl(""),
      complaintStatus: new FormControl(""),
      complaintRemarks: new FormControl(""),
    });
  }

  ngOnInit() {
    if (this._RegcomSer.ComplaintTypeDataByUser) {
      debugger;
      this.complaintDocName = this._RegcomSer.ComplaintTypeDataByUser.complaintDocName,
        this.Complaintdetail.patchValue({
          complaintNo: this._RegcomSer.ComplaintTypeDataByUser.complaintNo,
          registrationDate: this._RegcomSer.ComplaintTypeDataByUser.registrationDate,
          categoryName: this._RegcomSer.ComplaintTypeDataByUser.categoryName,
          subCategoryName: this._RegcomSer.ComplaintTypeDataByUser.subCategoryName,
          complaintType: this._RegcomSer.ComplaintTypeDataByUser.complaintType,
          stateName: this._RegcomSer.ComplaintTypeDataByUser.stateName,
          complaintNature: this._RegcomSer.ComplaintTypeDataByUser.complaintNature,
          complaintDocPath: this._RegcomSer.ComplaintTypeDataByUser.complaintDocPath,
          complaintWord: this._RegcomSer.ComplaintTypeDataByUser.complaintWord,
          complaintStatus: this._RegcomSer.ComplaintTypeDataByUser.complaintStatus,
          complaintRemarks: this._RegcomSer.ComplaintTypeDataByUser.complaintRemarks,

        });
    }
  }


  CheckStatus() {
    let complaintStatus = this.Complaintdetail.controls['complaintStatus'].value;
    if (complaintStatus) {
      return { 'background': complaintStatus === 'Pending' ? '#e1d949e8' : complaintStatus === 'Approved' ? 'lightgreen' : 'red' }
    }
  }
  DownloadFile() {
    debugger;
    if (this.complaintDocName) {
      this._RegcomSer.DownloadFile(this.complaintDocName);
    }
  }

}
