
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';
import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { LoginComponent } from './login/login.component';
import { GlobalConfig } from './helper/GlobalConfig';
// import { DxDataGridModule, DxTemplateModule } from 'devextreme-angular';
import { UserregistrationComponent } from './components/userregistration/userregistration.component';
import { StateService } from './services/state.service';
import { ConfirmationdialogComponent } from './components/confirmationdialog/confirmationdialog.component';
import { CategoryService } from './services/category.service';
import { AuthService } from './services/auth.service';
import { BaseService } from './helper/BaseService';
import { AdminService } from './services/admin.service';
import { GeneralService } from './services/general.service';
import { LoginService } from './services/login.service';
import { RegistercomplaintService } from './services/registercomplaint.service';
import { SubcategoryService } from './services/subcategory.service';
import { UseregistrationService } from './services/useregistration.service';
// import { ComplaintconfirmationdialogComponent } from './components/complaintconfirmationdialog/complaintconfirmationdialog.component';



@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    LoginComponent,
    UserregistrationComponent,
    ConfirmationdialogComponent,
    // ComplaintconfirmationdialogComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    // DxDataGridModule,
    // DxTemplateModule,

  ],
  providers: [StateService,CategoryService,AuthService,AdminService,
    GeneralService,LoginService,RegistercomplaintService,SubcategoryService,UseregistrationService

  ], entryComponents:[ConfirmationdialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    GlobalConfig.injector = injector;
    GlobalConfig.url.api = 'https://localhost:44367/api/';
    GlobalConfig.link.exceptapi = 'https://localhost:44367/';
    // 'http://mubbashir9-001-site2.atempurl.com/api/'
  }

}
