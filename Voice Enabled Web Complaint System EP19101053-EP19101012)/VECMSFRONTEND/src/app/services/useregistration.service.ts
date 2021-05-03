import { Injectable } from '@angular/core';
import { BaseService } from '../helper/BaseService';

@Injectable({
  providedIn: 'root'
})
export class UseregistrationService  extends BaseService{
  constructor() {
    super('UserRegistration');
   }
   GetUserRegistationData() {
    return  this.Get('GetUserRegistationData');
  }
  GetCompanyUsers() {
    return  this.Get('GetCompanyUsers');
  }
  
  GetUserType() {
    return  this.Get('GetUserType');
  }

  

  SubmitProfile(body: any) {
    return  this.Post('SubmitProfile', body);
  }

  SubmitUserRegistration(body: any) {
    return  this.Post('SubmitUserRegistration', body);
  }


  DeleteUserRegistrationData(Id: any) {
    const params: any = [{
      name: 'Id',
      value: Id
    }]
    return this.Get('DeleteUserRegistrationData', params);
  }

  
  GetUserRegistationDataById(UserId: any) {
    const params: any = [{
      name: 'UserId',
      value: UserId
    }]
    return this.Get('GetUserRegistationDataById', params);
  }
   UpdateUserRegistration(UserId: number,OldPassword:string ,Password: string) {
    const params: any = [
      {
        name: "UserId",
        value: UserId
      },
      {
        name: "OldPassword",
        value: OldPassword
      },
      {
        name: "Password",
        value: Password
      }
    ];

   return this.Get('UpdateUserRegistration', params);
   

  }

}
