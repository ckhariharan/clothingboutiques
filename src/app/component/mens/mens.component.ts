import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-mens',
  templateUrl: './mens.component.html',
  styleUrls: ['./mens.component.css']
})
export class MensComponent  implements OnInit{
  isOverlayVisible = false;
  isOverlayVisible1 = false;
isOverlayVisible2=false;
  FilteredProducts: any[] = [];

constructor (private Service: AdminService,private title:Title) {}

  toggleOverlay(): void {
    this.isOverlayVisible = !this.isOverlayVisible ;
  }
toggleOverlay1():void{
  this.isOverlayVisible1=!this.isOverlayVisible1;
}
toggleOverlay2():void{
  this.isOverlayVisible2=!this.isOverlayVisible2;
}

ngOnInit(): void {
this.title.setTitle('mens');

  this.FilteredProducts = this.Service.FilteredProduct
  console.log(this.FilteredProducts);
}
}
