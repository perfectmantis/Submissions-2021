import { Injectable } from '@angular/core';
import { BaseService } from '../helper/BaseService';
import { HttpClient } from '@angular/common/http';
import { GlobalConfig } from '../helper/GlobalConfig';
import { saveAs } from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class RegistercomplaintService extends BaseService {
  ComplaintTypeDataByUser: any;
  Url: string;
  ComplaintDetailDataAdmin: any;

  constructor() {
    super('RegisterComplaint');
  }

  GetComplaintTypeData() {
    return this.Get('GetComplaintTypeData');
  }

  GetComplaintDataByUser(UserId: any) {
    const params: any = [
      {
        value: UserId,
        name: "UserId"
      }];
    return this.Get('GetComplaintDataByUser', params);
  }

  GetComplaintDataByStatus(StatusId: any,UserId : any) {
    const params: any = [
      {
        value: StatusId,
        name: "StatusId"
      },
      {
        value: UserId,
        name: "UserId"
      },
    
    ];
    return this.Get('GetComplaintDataByStatus', params);
  }
  GetComplaintDataById(Id: any) {
    const params: any = [
      {
        value: Id,
        name: "Id"
      }];
    return this.Get('GetComplaintDataById', params);
  }

  SubmitRegisterComplaint(body: any) {
    return this.Post('SubmitRegisterComplaint', body);
  }
  UpdateComplaint(body: any) {
    return this.Post('UpdateComplaint', body);
  }
  AssignComplaint(body: any) {
    return this.Post('AssignComplaint', body);
  }
  DownloadFile(complaintDocName: string) {
    debugger;
    {
      this.Url = GlobalConfig.url.api.concat("RegisterComplaint/DownloadFile?fileName=" + complaintDocName);
      this.http.get(this.Url, { responseType: 'blob' })
        .subscribe(
          (data) => {
            debugger;

            console.log(data);
            const file: Blob = new Blob([data], { type: 'application/pdf,.xlsx,.txt' });
            saveAs(file, complaintDocName);  // `Attachment.png`
          }
        )

    }

  }

}