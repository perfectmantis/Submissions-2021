import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConfig } from './GlobalConfig';
import { AppResponse } from './AppResponse';



// @Injectable({
//     providedIn: 'root'
// })
export class BaseService {
     http: HttpClient;
    constructor(private controller: string) {

        this.http = GlobalConfig.injector.get(HttpClient);
    }

    CreateURL(action: string, paramters?: { name: string, value: any }): string {
        let url = '';
        if (action) {
            url = GlobalConfig.url.api.concat(this.controller.concat("/")).concat(action);
        }
    
        if (paramters && Array.isArray(paramters)) {
            url += '?';
            paramters.forEach((res) => {
               
                if (res) {
                    if (res.value && res.value != "")
                        url = url.concat(res.name.concat('=').concat(res.value).concat('&'));
                    else
                        url = url.concat(res.name.concat('=').concat(" ").concat('&'));
                }
            });

        }

        return url;

    }
    // this.http = 
    // async get(action: string) {
    //     return this.http.get(GlobalConfig.url.api.concat(action)).toPromise()
    //     .catch(() => { console.log("Error in application!") });
    // }

    fetch(action: string, paramters?: { name: string, value: any }) {
   
        return this.http.get<AppResponse>(this.CreateURL(action, paramters)).toPromise();
    }
    Get(action: string, paramters?: { name: string, value: any }) {
      
        return this.http.get<AppResponse>(this.CreateURL(action, paramters));
    }
    Post(action: string, body: any) {
      
        // return this.http.post<AppResponse>(this.CreateURL(action), body).toPromise();;
        return this.http.post<AppResponse>(this.CreateURL(action), body);

    }
    ShowError(errors: any) {

        switch (errors.status) {

            case 401: {
                alert("Custom Error From Base : ".concat(errors.statusText));
                break;
            }

            case 500: {
                alert("Custom Error From Base : ".concat(errors.statusText));
                break;
            }
            default: {
                alert(errors.statusText);
                break;
            }
        }

    }
}