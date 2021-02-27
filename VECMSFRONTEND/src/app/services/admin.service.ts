import { Injectable } from '@angular/core';
import { BaseComponent } from '../helper/BaseComponent';
import { BaseService } from '../helper/BaseService';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseService {

  constructor() {
    super('Dashboard');
  }
  GetAdminDashboardData() {
    return  this.Get('GetAdminDashboardData');
  }

  GetCompanyChart() {
    return  this.Get('GetCompanyChart');
  }
  GetUserDashboardData(UserId:any) {
    const params: any = [{
      name: 'UserId',
      value: UserId
    }]
    return  this.Get('GetUserDashboardData',params);
  }
  GetCompanyUserDashboardData(UserId:any) {
    const params: any = [{
      name: 'UserId',
      value: UserId
    }]
    return  this.Get('GetCompanyUserDashboardData',params);
  }

}
