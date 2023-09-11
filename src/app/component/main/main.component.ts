import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  showSplash = true;

  constructor(private router: Router,private Title:Title) { }

  ngOnInit(): void {

    this.Title.setTitle('main');

    setTimeout(() => {
      this.showSplash = false;
    }, 1000);

    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/userdashboard');
    }
  }
}
