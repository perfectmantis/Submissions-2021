import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  localcontent: any;
  constructor() {
    debugger;
    const localstoragedata = localStorage.getItem('appkey');
    this.localcontent = JSON.parse(localstoragedata);
  }

}
