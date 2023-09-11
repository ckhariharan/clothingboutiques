import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  
  showPassword: boolean = false;


  adminId: string = '';
  password: string = '';

  showError: string = '';

  constructor(public router: Router,private title:Title) { }

  onSubmit() {
    this.validation();
  }

  validation() {
    if (this.adminId === "" && this.password === "") {
      this.showError = "Please enter Email & Password";
    } else if (this.password === "") {
      this.showError = "Please enter your Password";
    } else if (this.adminId === "") {
      this.showError = "Please enter your Email";
    } else if (this.adminId === "admin@gmail.com" && this.password === "admin") {
      this.router.navigateByUrl('/admindashboard');
      localStorage.setItem('adminlogin', this.adminId);
    } else {
      this.showError = "Invalid User!";
    }
  }

  ngOnInit(): void {
 this.title.setTitle('adminlogin');

    if (localStorage.getItem('adminlogin')) {
      this.router.navigateByUrl('/admindashboard');
    }
  }


}
