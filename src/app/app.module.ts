import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http'; 
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';


import {AngularFireModule} from '@angular/fire/compat';
import { firebaseConfig } from './Config/firebase-config';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './component/main/main.component';
import { UserloginComponent } from './component/userlogin/userlogin.component';
import { AdminloginComponent } from './component/adminlogin/adminlogin.component';
import { UserdashboardComponent } from './component/userdashboard/userdashboard.component';
import { AdmindashboardComponent } from './component/admindashboard/admindashboard.component';
import { StaffloginComponent } from './component/stafflogin/stafflogin.component';
import { StaffdashboardComponent } from './component/staffdashboard/staffdashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './component/signup/signup.component';
import { AdminstaffComponent } from './component/adminstaff/adminstaff.component';
import { AdminproductComponent } from './component/adminproduct/adminproduct.component';
import { MensComponent } from './component/mens/mens.component';
import { WomensComponent } from './component/womens/womens.component';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UserloginComponent,
    AdminloginComponent,
    UserdashboardComponent,
    AdmindashboardComponent,
    StaffloginComponent,
    StaffdashboardComponent,
    SignupComponent,
    AdminstaffComponent,
    AdminproductComponent,
    MensComponent,
    WomensComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDividerModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    DatePipe,
    SweetAlert2Module.forRoot(),
AngularFireModule.initializeApp(firebaseConfig.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
