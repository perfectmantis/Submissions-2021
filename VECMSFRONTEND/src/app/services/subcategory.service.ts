import { Injectable } from '@angular/core';
import { BaseService } from '../helper/BaseService';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService extends BaseService {

  constructor() {
    super('SubCategory');
}
 
   GetSubCategoryData() {
    return  this.Get('GetSubCategoryData');
  }
  
  GetSubCategoryDataByCategory(CategoryId: any) {
    const params: any = [
      {
        value: CategoryId,
        name: "CategoryId"
      }];
    return this.Get('GetSubCategoryDataByCategory', params);
  }


  SubmitSubCategory(body: any) {
    return  this.Post('SubmitSubCategory', body);
  }


  DeleteSubCategoryData(Id: any) {
    const params: any = [{
      name: 'Id',
      value: Id
    }]
    return this.Get('DeleteSubCategoryData', params);
  }
}
