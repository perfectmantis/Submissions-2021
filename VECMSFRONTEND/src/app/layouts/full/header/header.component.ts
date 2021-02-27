import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { GlobalConfig } from '../../../helper/GlobalConfig';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  localcontent: any;
  LoginUserName: any;
  ImageName: any;
  ImageUrl: any='assets/images/users/1.jpg';

  constructor(private router: Router, private _location: Location) {
    this.GetLocalStorageItem();
    this.LoginUserName = this.localcontent['username'];
    this.ImageName = this.localcontent['image'];
    this.ImageUrl = GlobalConfig.link.exceptapi.concat('Documents/').concat(this.ImageName)
  }
  SignOut() {
    this.router.navigate(['/login']);
    localStorage.removeItem('appkey');
    localStorage.removeItem('Menu');
  }
  GetLocalStorageItem() {
    const localstoragedata = localStorage.getItem('appkey');
    this.localcontent = JSON.parse(localstoragedata);
  }

  NavigateBack() {
    this._location.back();
  }

}
