import { Injectable } from '@angular/core';
import { BaseService } from '../helper/BaseService';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppResponse } from '../helper/AppResponse';

@Injectable({
  providedIn: 'root'
})
export class StateService extends BaseService {

  constructor(private _httpClient: HttpClient) {
    super('State');
  }

  GetStateData() {
    return this.Get('GetStateData');
  }

  DeleteStateData(Id: any) {
    const params: any = [{
      name: 'Id',
      value: Id
    }]
    return this.Get('DeleteStateData', params);
  }

  SubmitState(body: any) {
    return this.Post('SaveState', body);
  }


}
