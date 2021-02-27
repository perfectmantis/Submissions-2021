import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { StateService } from '../../services/state.service';
import { MatSnackBar } from '@angular/material';
import { debug } from 'util';
import { AppResponse } from '../../helper/AppResponse';
import { BaseComponent } from '../../helper/BaseComponent';
import { ConfirmationdialogComponent } from '../confirmationdialog/confirmationdialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent extends BaseComponent {
  State: FormGroup;
  StateData: any;
  data: any;
  fileposted: File = null;
  AllStateData: Subscription;
  AllDeleteStateData: any;
  constructor(private fb: FormBuilder, private _stateSer: StateService, private MatSnackBar: MatSnackBar) {
    super();
    this.FormFieldIntialize();
  }
  FormFieldIntialize() {
    this.State = this.fb.group({
      stateName: ['', Validators.required],
      description: [''],
      id: 0
    });
  }
  SelectedRow(data) {
    if (data) {
      this.State.setValue(data);
    }
  }
  async ngOnInit() {

    await this.GetStateData();
  }
  async GetStateData() {

    this.AllStateData = this._stateSer.GetStateData().subscribe(result => {
      if (result.isSuccessful) {
        this.StateData = result.data;
      }
      else {
        this.showSnakMessage(result.errors, "Ok");
      }
    });
  }

  async DeleteStateData() {

    let Id = this.State.controls['id'].value;
    if (Id) {
      debugger;
      let dialogref = this.MatDialog.open(ConfirmationdialogComponent, { data: { action: Id }, minWidth: '300px', disableClose: true });
      dialogref.afterClosed().subscribe(result => {
        if (result) {
          {
            this.AllDeleteStateData = this._stateSer.DeleteStateData(Id).subscribe(result => {
              if (result.isSuccessful) {
                this.GetStateData();
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
  Addnew() {
    debugger;
    this.FormFieldIntialize();

  }

  IsValid(): boolean {
    return this.State.valid;
  }


  SubmitState() {
    debugger;
    if (this.IsValid()) {
      let body = this.State.value; //this.FillFields();
      debugger;
      this._stateSer.SubmitState(body).subscribe(res => {
        if (res.isSuccessful) {
          this.showsucess(res.data, "Ok");
          this.GetStateData();
          this.Addnew();
        }
        error => console.log(error)
      });
    }
  }
  ngOnDestroy() {
     this.AllStateData.unsubscribe();
  }

}
