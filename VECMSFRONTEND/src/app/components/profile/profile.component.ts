import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../helper/BaseComponent';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { StateService } from '../../services/state.service';
import { UseregistrationService } from '../../services/useregistration.service';
import { GlobalConfig } from '../../helper/GlobalConfig';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends BaseComponent {
  Profile: FormGroup;
  StateData: any;
  userid: any;
  IsShow: boolean = false;
  ImageUrl = "assets/images/user.png";
  // ImageUrl = GlobalConfig.url.;
  // ImageUrl = "@D:\Angular\Personal Projects\WebApiCoreProject\Documents\shahzad203939357.jpg"
  fileToUpload: File;
  // localcontent: any;
  usertypeid: any;
  fileUpload: File;
  FormFieldIntialize() {
    this.Profile = this.fb.group({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      contactNo: new FormControl(''),
      address: new FormControl(''),
      stateId: new FormControl('', Validators.required),
      companyName: new FormControl('', Validators.required),
      pinCode: new FormControl(''),
      password: new FormControl(''),
      id: 0
    });
  }
  constructor(private fb: FormBuilder, private _stateSer: StateService, private _userRegSer: UseregistrationService) {
    super();
    this.FormFieldIntialize();
    // this.GetLocalStorageItem();
    this.usertypeid = this.localcontent['usertypeid'];

    // if (this.usertypeid !== 2 || this.usertypeid !== 3)
    //   this.Navigate('/dashboard');
  }
  async GetStateData() {

    this._stateSer.GetStateData().subscribe(result => {
      if (result.isSuccessful) {
        this.StateData = result.data;
      }
      else {
        this.showSnakMessage(result.errors, "Ok");
      }
    });
  }

  async GetUserRegistationDataById() {
    if (this.userid) {
      this._userRegSer.GetUserRegistationDataById(this.userid).subscribe(result => {
        if (result.isSuccessful) {
          debugger;
           this.ImageUrl = GlobalConfig.link.exceptapi.concat('Documents/').concat(result.data.imageName);
          //  'https://localhost:44367/'.concat('Documents/').concat(result.data.imageName);
          
          result.data.imagePath;
          this.Profile.patchValue({
            contactNo: result.data.contactNo,
            email: result.data.email,
            fullName: result.data.fullName,
            password: result.data.password,
            address: result.data.address,
            stateId: result.data.stateId,
            companyName: result.data.companyName,
            pinCode: result.data.pinCode,
            id: result.data.id,


          });
          this.Profile.setValue(result.data);
        }
        else {
          this.showSnakMessage(result.errors, "Ok");
        }
      });
    }
  }


  // GetLocalStorageItem() {
  //   const localstoragedata = localStorage.getItem('appkey');
  //   this.localcontent = JSON.parse(localstoragedata);
  // }

  async ngOnInit() {

    debugger;


    this.userid = this.localcontent['userid']; //this.GeneralService.localcontent['userid'];
    this.GetStateData();
    this.GetUserRegistationDataById();

  }

  FileEvent(file: FileList) {
    debugger;
    this.fileToUpload = file.item(0);
    // fileEvent.target.value = null;


    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.ImageUrl = event.target.result;
    }

    reader.readAsDataURL(this.fileToUpload);
  }
  Addnew() {
    this.FormFieldIntialize();
  }
  IsValid(): boolean {
    return this.Profile.valid;
  }
  // async SubmitProfile() {
  //   debugger;
  //   if (this.IsValid()) {
  //     let body = this.Profile.value; //this.FillFields();
  //     debugger;
  //     this._userRegSer.SubmitProfile(body).subscribe(res => {
  //       if (res.isSuccessful) {
  //         this.showsucess("Saved Successfully.", "Ok");

  //       }
  //       error => console.log(error)
  //     });
  //   }
  // }

  async SubmitProfile() {
    debugger;
    if (this.IsValid()) {
      //let body = this.Profile.value; //this.FillFields();
      debugger;

      let body = this.Profile.value;
      const formData: FormData = new FormData();


      if (this.fileToUpload)
        formData.append("file", this.fileToUpload, this.fileToUpload.name);
      formData.append("contactNo", this.Profile.get('contactNo').value);
      formData.append("email", this.Profile.get('email').value);
      formData.append("fullName", this.Profile.get('fullName').value);
      formData.append("password", this.Profile.get('password').value);
      formData.append("address", this.Profile.get('address').value);
      formData.append("stateId", this.Profile.get('stateId').value);
      formData.append("companyName", this.Profile.get('companyName').value);
      formData.append("pinCode", this.Profile.get('pinCode').value);
      formData.append("id", this.Profile.get('id').value);
      formData.append("addBy", this.userid);
      // formData.append("obj", JSON.stringify(body));
      this._userRegSer.SubmitProfile(formData).subscribe(res => {
        if (res.isSuccessful) {
          this.showsucess("Saved Successfully.", "Ok");

        }
        error => console.log(error)
      });
    }
  }




  async handlefileImage(file: FileList) {
    // :FileList
    debugger;

    //  let file:FileList = fileEvent.target.files;

    console.log(file);
    debugger;
    // this.fileUpload = null;
    this.fileToUpload = file.item(0);
    // fileEvent.target.value = null;


    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.ImageUrl = event.target.result;
    }

    reader.readAsDataURL(this.fileToUpload);

  }
}
