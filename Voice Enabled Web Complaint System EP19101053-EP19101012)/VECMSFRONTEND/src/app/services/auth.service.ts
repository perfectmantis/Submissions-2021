import { Injectable } from '@angular/core';
import { StringifyOptions } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  checkUserNameAndPass(issuccessful: Boolean, data: any, rememberme: boolean,image:string): boolean {
    if (data) {
      let object = { username: data.fullName,userid:data.id,usertypeid:data.userTypeId ,rememberme: rememberme,image:image };
      if (issuccessful) {
        localStorage.setItem('appkey', JSON.stringify(object));
        return true;
      }
      else
        return false;
    }
  }
}
