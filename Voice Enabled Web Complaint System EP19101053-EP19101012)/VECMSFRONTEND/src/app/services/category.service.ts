import { Injectable } from '@angular/core';
import { BaseService } from '../helper/BaseService';
import { getMultipleValuesInSingleSelectionError } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {

  constructor(private _httpClient : HttpClient) {
    super('Category');
}
  // async GetUsers()
  // {
  //   return await this.fetch('GetUser');
  // }

   GetCategoryData() {
    return  this.Get('GetCategoryData');
  }

   SubmitCategory(body: any) {
    return  this.Post('SubmitCategory', body);
  }


  DeleteCategoryData(Id: any) {
    const params: any = [{
      name: 'Id',
      value: Id
    }]
    return this.Get('DeleteCategoryData', params);
  }
}
