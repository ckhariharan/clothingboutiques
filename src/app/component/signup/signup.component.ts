import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UlserviceService } from 'src/app/services/ulservice.service';
import { Title } from '@angular/platform-browser';


interface User {
  name: string
  email: string
  number: string
  password: string
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  constructor(public router: Router, private http: HttpClient, private formBuilder: FormBuilder, private ulserviceService: UlserviceService,private title:Title) { }

  userName: string = '';
  email: string = '';
  number: string = '';
  password: string = '';

  registrationForm!: FormGroup;

  showError: string = '';

  ngOnInit(): void {
    this.title.setTitle('signup');

    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/userdashboard');
    }

    this.registrationForm = this.formBuilder.group({
      name: [''],
      email: [''],
      number: [''],
      password: ['']
    });
  }

  moveToLogin() {
    this.router.navigateByUrl('/main')
  }

  onSubmit(): void {
    this.validation();
  }

  performLogin() {
    this.http.get<User[]>('https://clothingbotiquesdb.onrender.com/user').subscribe(
      (users: User[]) => {
        const foundUser = users.find(user => user.email === this.email);
        if (foundUser) {
          this.showError = "Already a User! ( 'Try Another Email ID' )";
        } else {
          const user = this.registrationForm.value;
          this.ulserviceService.register(user).subscribe(res => {
            localStorage.setItem('token', this.email);
            this.router.navigateByUrl('/userdashboard');
          });
        }
      }
    );
  }
  validation() {
    if (this.userName === "") {
      this.showError = "Please enter Name";
    } else if (this.email === "") {
      this.showError = "Please enter Email";
    } else if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(this.email)) {
      this.showError = "Invalid Email";
    } else if (this.number === "") {
      this.showError = "Please enter your Mobile No";
    } else if (parseInt(this.number) <= 0) {
      this.showError = "Invalid Mobile No";
    } else if (String(this.number).length !== 10) {
      this.showError = "Invalid Mobile No";
    } else if (this.password === "") {
      this.showError = "Please enter Password";
    } else if (this.userName && this.email && this.password) {
      this.performLogin();
    }
  }


}
