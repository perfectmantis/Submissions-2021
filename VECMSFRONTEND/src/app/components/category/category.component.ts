import { Component, OnInit, Inject, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../helper/BaseComponent';
import { ConfirmationdialogComponent } from '../confirmationdialog/confirmationdialog.component';
import { error } from 'util';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent extends BaseComponent {
  CategoryDetail = [];
  Category: FormGroup;
  UserData: any;
  CategoryData: any;
  constructor(private fb: FormBuilder, private _catSer: CategoryService) {

    super();
    this.FormFieldIntialize();
  }

  FormFieldIntialize()
  {
    this.Category = this.fb.group({
      categoryName: new FormControl("", Validators.required),
      description: new FormControl(""),
      id : 0
    });
  }
  SelectedRow(data) {
    if (data) {
      this.Category.setValue(data);
    }
  }
  async ngOnInit() {

    await this.GetCategoryData();
  }
  async GetCategoryData() {
     this._catSer.GetCategoryData().subscribe((result) => {
      if (result.isSuccessful) {
        this.CategoryData = result.data;
      }
      else {
        this.showSnakMessage(result.errors, "Ok");
      }
    });

  }
  Addnew() {
    debugger;
    this.FormFieldIntialize();
  }

  IsValid(): boolean {
    return this.Category.valid;
  }

  async SubmitCategory() {
    debugger;
    if (this.IsValid()) {
      let body = this.Category.value; //this.FillFields();
      debugger;
      this._catSer.SubmitCategory(body).subscribe(res => {
        if (res.isSuccessful) {
          this.showsucess(res.data, "Ok");
          this.GetCategoryData();
          this.Addnew();
        }
        error => console.log(error)
      });
    }

  }
  async DeleteStateData() {

    let Id = this.Category.controls['id'].value;
    if (Id) {
      debugger;
      let dialogref = this.MatDialog.open(ConfirmationdialogComponent, { data: { action: Id }, minWidth: '300px', disableClose: true });
      dialogref.afterClosed().subscribe(result => {
        if (result) {
          {
            this._catSer.DeleteCategoryData(Id).subscribe(result => {
              if (result.isSuccessful) {
                this.GetCategoryData();
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
}
