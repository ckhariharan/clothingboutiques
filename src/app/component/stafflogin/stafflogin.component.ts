import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

interface User {
  Phone: string;
  EID: string;
}

@Component({
  selector: 'app-stafflogin',
  templateUrl: './stafflogin.component.html',
  styleUrls: ['./stafflogin.component.css']
})
export class StaffloginComponent  implements OnInit {

  Phone: string = '';
  EID: string = '';

  showError: string = '';

  
  constructor(public router: Router, private http: HttpClient,private title:Title) { }

  onSubmit() {
    this.validation();
  }

  validation() {
    if (this.Phone === "" && this.EID === "") {
      this.showError = "Please enter Staff ID & Phone Number";
    } else if (this.Phone === "") {
      this.showError = "Please enter Phone No";
    } else if (this.EID === "") {
      this.showError = "Please enter Staff ID";
    } else if (this.Phone && this.EID) {
      this.performLogin();
    } else {
      this.showError = "Invalid User!";
    }
  }

  performLogin() {
    const loginData: User = { Phone: this.Phone, EID: this.EID };
    this.http.get<User[]>('https://clothingbotiquesdb.onrender.com/employee').subscribe(
      (users: User[]) => {
        const foundUser = users.find(user => user.Phone === loginData.Phone && user.EID === loginData.EID);
        if (foundUser) {
          this.router.navigate(['/staffdashboard']);
          localStorage.setItem('staff', this.Phone);
        } else {
          this.showError = "Invalid User!";
        }
      }
    );
  }

  ngOnInit(): void {
    this.title.setTitle('stafflogin');
    if (localStorage.getItem('staff')) {
      this.router.navigateByUrl('/staffdashboard');
    }
  }
  // back(){
  //   this.router.navigateByUrl('/adminlogin')
  // }


}
