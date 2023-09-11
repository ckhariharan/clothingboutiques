import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './component/main/main.component';
import { AdmindashboardComponent } from './component/admindashboard/admindashboard.component';
import { AdminloginComponent } from './component/adminlogin/adminlogin.component';
import { StaffdashboardComponent } from './component/staffdashboard/staffdashboard.component';
import { StaffloginComponent } from './component/stafflogin/stafflogin.component';
import { UserdashboardComponent } from './component/userdashboard/userdashboard.component';
import { UserloginComponent } from './component/userlogin/userlogin.component';
import { SignupComponent } from './component/signup/signup.component';
import { AdminstaffComponent } from './component/adminstaff/adminstaff.component';
import { AdminproductComponent } from './component/adminproduct/adminproduct.component';
import { MensComponent } from './component/mens/mens.component';
import { WomensComponent } from './component/womens/womens.component';

const routes: Routes = [
// {path:'',component:MensComponent}
{path:'',component:MainComponent},
  {path:'main',component:MainComponent},
  {path:'admindashboard',component:AdmindashboardComponent},
  {path:'adminlogin',component:AdminloginComponent},
  {path:'main',component:MainComponent},
  {path:'staffdashboard',component:StaffdashboardComponent},
  {path:'stafflogin',component:StaffloginComponent},
  {path:'userdashboard',component:UserdashboardComponent},
  {path:'userlogin',component:UserloginComponent},
  {path:'signup',component:SignupComponent},
  {path:'adminstaff',component:AdminstaffComponent},
  {path:'adminproduct',component:AdminproductComponent},
  {path:'mens',component:MensComponent},
  {path:'womens',component:WomensComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
