import { Injectable } from '@angular/core';
import { LoginService } from '../../services/login.service';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

// const MENUITEMS = [
  
//   { state: 'dashboard', name: 'Dashbord', type: 'link', icon: 'dashboard' },
//   { state: 'managecomplaints', type: 'link', name: 'Manage Complaints', icon: 'widgets' },
//   { state: 'profile', type: 'link', name: 'Profile', icon: 'person_pin',  },
//   { state: 'category', type: 'link', name: 'Category', icon: 'category',  },
//   { state: 'subcategory', type: 'link', name: 'Sub Category', icon: 'view_list'},
//   { state: 'state', type: 'link', name: 'State', icon: 'apartment', icontype: 'mat' },
//   { state: 'registercomplaint', type: 'link', name: 'Register Complaint', icon: 'donut_small'},
//   { state: 'complainthistory', type: 'link', name: 'Complaint History', icon: 'list' },
//   { state: 'users', type: 'link', name: 'Users', icon: 'person_pin', icontype: 'mat'},


 
// ];

@Injectable()
export class MenuItems {
  localcontent: any;
  usertypeid: any;
  MENUITEMS: any;
  getMenuitem(): Menu[] {
    return  this._loginSer.MENUITEMS;// this.MENUITEMS;
  }

  // getMenuitem(): {
  //   return MENUITEMS;
  // }
  GetLocalStorageItem() {
    const localstoragedata = localStorage.getItem('appkey');
    this.localcontent = JSON.parse(localstoragedata);
  }
  constructor(private _loginSer : LoginService)
  {
    // this.MENUITEMS  this._loginSer.MENUITEMS
  }
}
