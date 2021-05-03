import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../../helper/BaseComponent';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Subscription } from 'rxjs';
import { SubcategoryService } from '../../services/subcategory.service';
import { RegistercomplaintService } from '../../services/registercomplaint.service';
import { StateService } from '../../services/state.service';
import { DxDataGridModule, DxDataGridComponent } from "devextreme-angular";
import { ActionContext } from '../../shared/strategy/action-context';
import { SpeechRecognizerService } from '../../shared/services/speech-recognizer.service';
import { SpeechNotification } from '../../shared/speech-notification';
import { SpeechError } from '../../shared/speech-error';



@Component({
  selector: 'app-registercomplaint',
  templateUrl: './registercomplaint.component.html',
  styleUrls: ['./registercomplaint.component.css']
})
export class RegistercomplaintComponent extends BaseComponent {
@ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;  
  
  //Voice
  finalTranscript = '';
  recognizing = false;
  notification: string;
  languages: string[] = ['en-US', 'es-ES'];
  currentLanguage: string;
  actionContext: ActionContext = new ActionContext();
  //ENd

RegisterComplaint: FormGroup;
  CategoryData: any;
  SubCategoryData: any;
  ComplaintTypeData: any;
  AllStateData: Subscription;
  StateData: any;
  fileUpload: File = null;
  userid: any;
  @ViewChild('fileUploader', { static: false }) fileUploader: ElementRef;
  TestData: Customer[];
  constructor(private fb: FormBuilder, private _catSer: CategoryService, private _subcatSer: SubcategoryService, private _regComSer: RegistercomplaintService, private _stateSer: StateService,private changeDetector: ChangeDetectorRef, private speechRecognizer: SpeechRecognizerService) {
    super();
    this.FormFieldIntialize();
  }


  FormFieldIntialize() {
    this.RegisterComplaint = this.fb.group({
      categoryId: new FormControl("", Validators.required),
      subCategoryId: new FormControl("", Validators.required),
      complaintTypeId: new FormControl("", Validators.required),
      stateId: new FormControl("", Validators.required),
      complaintNature: new FormControl("", Validators.required),
      complaintWord: new FormControl(''),
      id: 0
    });
  }

  GetCategoryData() {
    this._catSer.GetCategoryData().subscribe(result => {
      if (result.isSuccessful) {
        this.CategoryData = result.data;
      }
      else {
        this.showSnakMessage(result.errors, "Ok");
      }
    });
  }
  GetSubCategoryData(obj) {
    debugger;
    if (obj) {
      this._subcatSer.GetSubCategoryDataByCategory(obj).subscribe(result => {
        if (result.isSuccessful) {
          this.SubCategoryData = result.data;
        }
        else {
          this.showSnakMessage(result.errors, "Ok");
        }
      })
    }
  }
  GetComplaintTypeData() {
    this._regComSer.GetComplaintTypeData().subscribe(result => {
      if (result.isSuccessful) {
        this.ComplaintTypeData = result.data;
      }
      else {
        this.showSnakMessage(result.errors, "Ok");
      }
    })
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
  GetLocalStorageItem() {
    const localstoragedata = localStorage.getItem('appkey');
    this.localcontent = JSON.parse(localstoragedata);
  }

  // getTotalPageCount() {

  //  return this.gridContainer.instance.pageCount();

  // }
  changePageSize () {
    this.dataGrid.instance.pageSize(8);
}
selectedRowsData = [];
goToLastPage () {
    this.dataGrid.instance.pageIndex(this.dataGrid.instance.pageCount() - 1);
}

getSelectedData() {
  this.selectedRowsData = this.dataGrid.instance.getSelectedRowsData();
  console.log(this.selectedRowsData);
}
  ngOnInit() {

    debugger;

    // select count(*) TotalComplain ,DATENAME(Month,c.AddOn) MonthNo from [dbo].[ComplaintRegistration] as c group by DATENAME(Month,c.AddOn)
  //  this.getSelectedData();

    this.TestData = customers;
    this.GetCategoryData();
    this.GetComplaintTypeData();
    this.GetStateData();
    this.GetLocalStorageItem();
    this.userid = this.localcontent['userid'];
    // this.changePageSize();

    this.currentLanguage = this.languages[0];
    this.speechRecognizer.initialize(this.currentLanguage);
    this.initRecognition();
    this.notification = null;

    // this.goToLastPage();
      
  }
  Addnew() {
    this.FormFieldIntialize();
    this.fileUploader.nativeElement.value = null;
  }
  ngOnDestroy() {
    // this.CategoryData.unsubscribe();
    // this.SubCategoryData.unsubscribe();
    // this.ComplaintTypeData.unsubscribe();
  }

  FileEvent(fileEvent) {
    let file: FileList = fileEvent.target.files;

    console.log(file);
    debugger;
    this.fileUpload = file.item(0);
    // fileEvent.target.value = null;
    console.log("fileUpload", this.fileUpload);
  }
  IsValid(): boolean {
    return this.RegisterComplaint.valid;
  }
  SubmitRegisterComplaint() {
    debugger;
    if (this.IsValid()) {
      let body = this.RegisterComplaint.value;
      const formData: FormData = new FormData();

      // console.log("Icon Name",FileToUpload.name);
      if (this.fileUpload)
        formData.append("file", this.fileUpload, this.fileUpload.name);
      // else
      // formData.append("file", this.fileUpload, '');
      formData.append("categoryId", this.RegisterComplaint.get('categoryId').value);
      formData.append("subCategoryId", this.RegisterComplaint.get('subCategoryId').value);
      formData.append("stateId", this.RegisterComplaint.get('stateId').value);
      formData.append("complaintTypeId", this.RegisterComplaint.get('complaintTypeId').value);
      formData.append("complaintNature", this.RegisterComplaint.get('complaintNature').value);
      formData.append("complaintWord", this.RegisterComplaint.get('complaintWord').value);
      formData.append("id", this.RegisterComplaint.get('id').value);
      formData.append("addBy", this.userid);
      formData.append("obj", JSON.stringify(body));
      debugger;
      this._regComSer.SubmitRegisterComplaint(formData).subscribe(res => {
        if (res.isSuccessful) {
          this.showsucess(res.data, "Ok");
          // this.GetSubCategoryData();
          this.Addnew();
        }
        error => console.log(error)
      });
    }
  }


  startButton(event) {
    debugger;
    // this.Print();
    if (this.recognizing) {
      this.speechRecognizer.stop();
      return;
    }


    this.speechRecognizer.start(event.timeStamp);
  }

  onSelectLanguage(language: string) {
    this.currentLanguage = language;
    this.speechRecognizer.setLanguage(this.currentLanguage);
  }
  private initRecognition() {
    this.speechRecognizer.onStart()
      .subscribe(data => {
        this.recognizing = true;
        this.notification = 'I\'m listening...';
        this.detectChanges();
      });

    this.speechRecognizer.onEnd()
      .subscribe(data => {
        this.recognizing = false;
        this.detectChanges();
        this.notification = null;
      });

    this.speechRecognizer.onResult()
      .subscribe((data: SpeechNotification) => {
        const message = data.content.trim();
        if (data.info === 'final_transcript' && message.length > 0) {
          this.finalTranscript = `${this.finalTranscript}\n${message}`;
          this.actionContext.processMessage(message, this.currentLanguage);
          this.detectChanges();
          this.actionContext.runAction(message, this.currentLanguage);
        }
      });

    this.speechRecognizer.onError()
      .subscribe(data => {
        switch (data.error) {
          case SpeechError.BLOCKED:
          case SpeechError.NOT_ALLOWED:
            this.notification = `Cannot run the demo.
            Your browser is not authorized to access your microphone. Verify that your browser has access to your microphone and try again.
            `;
            break;
          case SpeechError.NO_SPEECH:
            this.notification = `No speech has been detected. Please try again.`;
            break;
          case SpeechError.NO_MICROPHONE:
            this.notification = `Microphone is not available. Plese verify the connection of your microphone and try again.`;
            break;
          default:
            this.notification = null;
            break;
        }
        this.recognizing = false;
        this.detectChanges();
      });
  }
  detectChanges() {
    this.changeDetector.detectChanges();
  }
  

}

export class Customer {
  ID: number;
  CompanyName: string;
  Address: string;
  City: string;
  State: string;
  Zipcode: number;
  Phone: string;
  Fax: string;
  Website: string;
}
let customers: Customer[] = [{
  "ID": 1,
  "CompanyName": "Super Mart of the West",
  "Address": "702 SW 8th Street",
  "City": "Bentonville",
  "State": "Arkansas",
  "Zipcode": 72716,
  "Phone": "(800) 555-2797",
  "Fax": "(800) 555-2171",
  "Website": "http://www.nowebsitesupermart.com"
}, {
  "ID": 2,
  "CompanyName": "Electronics Depot",
  "Address": "2455 Paces Ferry Road NW",
  "City": "Atlanta",
  "State": "Georgia",
  "Zipcode": 30339,
  "Phone": "(800) 595-3232",
  "Fax": "(800) 595-3231",
  "Website": "http://www.nowebsitedepot.com"
}, {
  "ID": 3,
  "CompanyName": "K&S Music",
  "Address": "1000 Nicllet Mall",
  "City": "Minneapolis",
  "State": "Minnesota",
  "Zipcode": 55403,
  "Phone": "(612) 304-6073",
  "Fax": "(612) 304-6074",
  "Website": "http://www.nowebsitemusic.com"
}, {
  "ID": 4,
  "CompanyName": "Tom's Club",
  "Address": "999 Lake Drive",
  "City": "Issaquah",
  "State": "Washington",
  "Zipcode": 98027,
  "Phone": "(800) 955-2292",
  "Fax": "(800) 955-2293",
  "Website": "http://www.nowebsitetomsclub.com"
}, {
  "ID": 5,
  "CompanyName": "E-Mart",
  "Address": "3333 Beverly Rd",
  "City": "Hoffman Estates",
  "State": "Illinois",
  "Zipcode": 60179,
  "Phone": "(847) 286-2500",
  "Fax": "(847) 286-2501",
  "Website": "http://www.nowebsiteemart.com"
}, {
  "ID": 6,
  "CompanyName": "Walters",
  "Address": "200 Wilmot Rd",
  "City": "Deerfield",
  "State": "Illinois",
  "Zipcode": 60015,
  "Phone": "(847) 940-2500",
  "Fax": "(847) 940-2501",
  "Website": "http://www.nowebsitewalters.com"
}, {
  "ID": 7,
  "CompanyName": "StereoShack",
  "Address": "400 Commerce S",
  "City": "Fort Worth",
  "State": "Texas",
  "Zipcode": 76102,
  "Phone": "(817) 820-0741",
  "Fax": "(817) 820-0742",
  "Website": "http://www.nowebsiteshack.com"
}, {
  "ID": 8,
  "CompanyName": "Circuit Town",
  "Address": "2200 Kensington Court",
  "City": "Oak Brook",
  "State": "Illinois",
  "Zipcode": 60523,
  "Phone": "(800) 955-2929",
  "Fax": "(800) 955-9392",
  "Website": "http://www.nowebsitecircuittown.com"
}, {
  "ID": 9,
  "CompanyName": "Premier Buy",
  "Address": "7601 Penn Avenue South",
  "City": "Richfield",
  "State": "Minnesota",
  "Zipcode": 55423,
  "Phone": "(612) 291-1000",
  "Fax": "(612) 291-2001",
  "Website": "http://www.nowebsitepremierbuy.com"
}, {
  "ID": 10,
  "CompanyName": "ElectrixMax",
  "Address": "263 Shuman Blvd",
  "City": "Naperville",
  "State": "Illinois",
  "Zipcode": 60563,
  "Phone": "(630) 438-7800",
  "Fax": "(630) 438-7801",
  "Website": "http://www.nowebsiteelectrixmax.com"
}, {
  "ID": 11,
  "CompanyName": "Video Emporium",
  "Address": "1201 Elm Street",
  "City": "Dallas",
  "State": "Texas",
  "Zipcode": 75270,
  "Phone": "(214) 854-3000",
  "Fax": "(214) 854-3001",
  "Website": "http://www.nowebsitevideoemporium.com"
}, {
  "ID": 12,
  "CompanyName": "Screen Shop",
  "Address": "1000 Lowes Blvd",
  "City": "Mooresville",
  "State": "North Carolina",
  "Zipcode": 28117,
  "Phone": "(800) 445-6937",
  "Fax": "(800) 445-6938",
  "Website": "http://www.nowebsitescreenshop.com"
}];