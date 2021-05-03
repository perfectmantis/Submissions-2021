import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { UserregistrationComponent } from './components/userregistration/userregistration.component';

export const AppRoutes: Routes = [
  {

    //Can activate check wheter user is authenticate or not otherwise it will redirect to Login 
    path: '',
    component: FullComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
        canActivate:[AuthGuard]
      },
      // {
      //   path: 'company',
      //   loadChildren: () => import('./components/company/company.module').then(m => m.CompanyModule)
      // },
      {
        path: 'category', loadChildren: () => import('./components/category/category.module').then(m => m.CategoryModule)
      },
      {
        path: 'changepassword', loadChildren: () => import('./components/changepassword/changepassword.module').then(m => m.ChangepasswordModule)
      },
      {

        path: 'subcategory', loadChildren: () => import('./components/subcategory/subcategory.module').then(m => m.SubcategoryModule)
      },

      {
        path: 'state', loadChildren: () => import('./components/state/state.module').then(o => o.StateModule)
      },
      {
        path: 'profile', loadChildren: () => import('./components/profile/profile.module').then(o => o.ProfileModule)
      },
      {
        path: 'dashboard', loadChildren: () => import('./components/admindashboard/admindashboard.module').then(o => o.AdmindashboardModule)
      },
      {
        path: 'userdashboard', loadChildren: () => import('./components/userdashboard/userdashboard.module').then(o => o.UserdashboardModule)
      },
      {
        path: 'registercomplaint', loadChildren: () => import('./components/registercomplaint/registercomplaint.module').then(o => o.RegistercomplaintModule)
      },
      {
        path: 'complainthistory', loadChildren: () => import('./components/usercomplainthistory/usercomplainthistory.module').then(o => o.UsercomplainthistoryModule)
      },
      {
        path: 'users', loadChildren: () => import('./components/userlist/userlist.module').then(o => o.UserlistModule)
      },

      {
        path: 'managecomplaints', loadChildren: () => import('./components/managecomplaints/managecomplaints.module').then(o => o.ManagecomplaintsModule)

      }



    ],
  },



  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login', component: LoginComponent, pathMatch: 'full'
  },
  {
    path: 'userregistration', component: UserregistrationComponent, pathMatch: 'full'
  },

  // To navigate to blank component in case of not found any of component regarding this app
  {
    path: "**", redirectTo: ''
  }
];
