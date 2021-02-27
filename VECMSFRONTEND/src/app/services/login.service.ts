import { Injectable } from '@angular/core';
import { BaseService } from '../helper/BaseService';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {
  MENUITEMS: any;

  constructor() {
    super('Login');
  }

  GetUserVerification(username:string,password:any) {
    const params :any=[
      {
        name:"UserName",
        value:username
      },
      {
        name:"Password",
        value:password
      }
    ]
    return this.Get('GetUserVerification', params);
  }

  GetScreens(UserTypeId:any) {
    const params :any=[
      {
        name:"UserTypeId",
        value:UserTypeId
      }
    
    ]
    return this.Get('GetScreens', params);
  }
}
