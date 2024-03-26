import { AfterViewInit, Component, OnInit, Renderer2, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

interface User {

  email: string;
  password: string;
}
@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit,AfterViewInit {
  showPassword: boolean = false;


  constructor(public router: Router,private renderer: Renderer2, private http: HttpClient,private title:Title) { }


  ngAfterViewInit(): void {
    this.addGoogleSignInScript();
  }

  private addGoogleSignInScript(): void {
    const script = this.renderer.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    this.renderer.appendChild(document.head, script);
  }

  email: string = '';
  password: string = '';
  showError: string = '';

  moveToSignup() {
    this.router.navigateByUrl('/signup')
  }

  ngOnInit(): void {
     
    this.title.setTitle('userlogin');

    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/userdashboard');
    }
  }

  onSubmit() {
    this.validation();
  }

  performLogin() {
    const loginData: User = { email: this.email, password: this.password };

    this.http.get<User[]>('https://clothingbotiquesdb.onrender.com/user').subscribe(
      (users: User[]) => {
        const foundUser = users.find(user => user.email === loginData.email && user.password === loginData.password);
        if (foundUser) {
          this.router.navigate(['/userdashboard']);
          localStorage.setItem('token', this.email);
        } else {
          this.showError = "Invalid User!";
        }
      }
    );
  }

  validation() {
    if (this.email === "" && this.password === "") {
      this.showError = "Please enter Email & Password";
    } else if (this.password === "") {
      this.showError = "Please enter your Password";
    } else if (this.email === "") {
      this.showError = "Please enter your Email";
    } else if (this.email && this.password) {
      this.performLogin();
    } else {
      this.showError = "Invalid User!";
    }
  }



}
