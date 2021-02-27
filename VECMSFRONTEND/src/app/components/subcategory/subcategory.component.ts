import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BaseComponent } from '../../helper/BaseComponent';
import { CategoryService } from '../../services/category.service';
import { SubcategoryService } from '../../services/subcategory.service';
import { ConfirmationdialogComponent } from '../confirmationdialog/confirmationdialog.component';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent extends BaseComponent {
  SubCategory: FormGroup;
  UserData: any[];
  CategoryData: any;
  SubCategoryData: any;

  constructor(private fb: FormBuilder, private _catSer: CategoryService, private _subcatSer: SubcategoryService) {
    super();
    this.FormFieldIntialize();
  }
  FormFieldIntialize() {
    this.SubCategory = this.fb.group({
      categoryId: new FormControl("", Validators.required),
      subCategoryName: new FormControl("", Validators.required),
      id: 0
    });
  }
  SelectedRow(data) {
    if (data) {
      this.SubCategory.patchValue(
        {
          categoryId: data.categoryId,
          subCategoryName: data.subCategoryName,
          id: data.id,
        }
      );
    }
  }
  async GetCategoryData() {
    this._catSer.GetCategoryData().subscribe(result => {
      if (result.isSuccessful) {
        this.CategoryData = result.data;
      }
      else {
        this.showSnakMessage(result.errors, "Ok");
      }
    });
  }

  GetSubCategoryData() {
    this._subcatSer.GetSubCategoryData().subscribe(result => {
      if (result.isSuccessful) {
        this.SubCategoryData = result.data;
      }
      else {
        this.showSnakMessage(result.errors, "Ok");
      }
    })
  }
  Addnew() {
    debugger;
    this.FormFieldIntialize();
  }
  IsValid(): boolean {
    return this.SubCategory.valid;
  }
  async SubmitSubCategory() {
    debugger;
    if (this.IsValid()) {
      let body = this.SubCategory.value; //this.FillFields();
      debugger;
      this._subcatSer.SubmitSubCategory(body).subscribe(res => {
        if (res.isSuccessful) {
          this.showsucess(res.data, "Ok");
          this.GetSubCategoryData();
          this.Addnew();
        }
        error => console.log(error)
      });
    }

  }

  async DeleteSubCategoryData() {

    let Id = this.SubCategory.controls['id'].value;
    if (Id) {
      debugger;
      let dialogref = this.MatDialog.open(ConfirmationdialogComponent, { data: { action: Id }, minWidth: '300px', disableClose: true });
      dialogref.afterClosed().subscribe(result => {
        if (result) {
          {
            this._subcatSer.DeleteSubCategoryData(Id).subscribe(result => {
              if (result.isSuccessful) {
                this.GetSubCategoryData();
                this.Addnew();
              }
              else {
                this.showSnakMessage(result.errors, "Ok");
              }
            });
          }
        }
      })
    }

  }

  ngOnInit() {
    this.GetCategoryData();
    this.GetSubCategoryData();
  }

}
