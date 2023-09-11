import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/services/product.service';
import { AdminService } from 'src/app/services/admin.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

import {AngularFireAnalytics} from '@angular/fire/compat/analytics';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  number: string;
  wishlist?: [];
}
@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
  offsetX = 0;
  slideWidth = window.innerWidth;
  banners: any;

  openProductDiolog: boolean = false;
  openPaymentDiolog: boolean = false;

  diologData: any = {};
  quantity: number = 1;
  reviewMessage: any;
  grandTotal: any;
  pricePerItem: number = 0;

  doorno: string = '';
  street: string = '';
  city: string = '';
  pincode: any = '';
  showError: string = "";

  productList: any[] = [];
  categories: string[] = [];
  selectedCategory: string = 'all';
  filteredProducts: any[] = [];
  searchTerm: string = '';
  isloading:boolean=false;

  showStockIssue!: string;

  email!: string | null;
  userData: User[] = [];

  createOrderForm!: FormGroup;
  postMessage: any;

  images: string[] = [
    'assets/images/user/banner1.jpg',
    'assets/images/user/banner3.jpg',
    'assets/images/user/banner2.jpg',
  ];
  activeIndex: number = 0;


  constructor(public router: Router, public userService: UserService,public productService: ProductService,  private formBuilder: FormBuilder, public adminService: AdminService,private http: HttpClient,private analytics:AngularFireAnalytics,private title:Title) { }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/main');
  }

  isSticky = false;
  
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    // Determine when to make the element sticky
    this.isSticky = window.pageYOffset >= 100; // Change '100' to the desired offset where the sticky behavior starts
  }
  
  ngOnInit(): void {

    this.title.setTitle('userdashboard');
    if (localStorage.getItem('token') === null) {
      this.router.navigateByUrl('/main')

      
    }
    this.startCarousel();
  
  //  this.getAll();
    this.categorizeProducts();
    this.filterProductsByCategory();
    this.email = localStorage.getItem('token');
    this.getUserData();
    this.isWishlist();
    this.createOrderForm = this.formBuilder.group({
      id: [''],
      PID: [''],
      userName: [''],
      phoneNo: [''],
      Address: [''],
      productName: [''],
      productPrice: [''],
      quantity: [''],
      grandTotal: ['']
    });

  }
  startCarousel() {
    setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.images.length;
    }, 3000); // Change the duration (in milliseconds) as needed
  }
  

  private categorizeProducts() {
    this.categories = Array.from(new Set(this.productList.map((p) => p.catogory)));
  }
all(){
  this.getAll()
}


  getAll() {
    this.isloading=true;
    this.productService.getProducts().subscribe((products) => {
      this.productList = products;
      this.isloading=false;
      this.categorizeProducts();
      this.filterProductsByCategory();
    });
  }



  openProduct(product: any) {
    this.diologData = product;
    this.grandTotal = product.Price;
    this.pricePerItem = product.Price;
    console.log(product);
    console.log(this.diologData);
    this.openProductDiolog = true;
  }

  increaseQuantity() {
    if (this.diologData.Stock > this.quantity) {
      this.quantity++;
      this.calculateGrandTotal();
    } else {
      this.showStockIssue = `Currently stocks in (${this.diologData.Stock}) Only`;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.showStockIssue = "";
      this.quantity--;
      this.calculateGrandTotal();
    }
  }

  calculateGrandTotal() {
    this.grandTotal = this.quantity * this.pricePerItem;
  }

  removePricePerItem() {
    this.pricePerItem = 0;
  }

  filterProductsByCategory() {
    this.filteredProducts =
      this.selectedCategory === 'all' ? this.productList: this.productList.filter((product) => product.catogory === this.selectedCategory);
  }

  mensp() {
    this.productService.getProducts().subscribe((products) => {
      this.productList = products;
      this.filteredProducts = this.productList.filter((products) => products.catogory === 'MENS');
    });
  }


   womensp(){
    this.productService.getProducts().subscribe((products) => {
      this.productList = products;
    this.filteredProducts=this.productList.filter((product) => product.catogory === 'WOMENS');
    });
   }
kidsp(){
  this.productService.getProducts().subscribe((products) => {
    this.productList = products;
  this.filteredProducts=this.productList.filter((product)=> product.catogory==='KIDS');
});

}

  searchProducts() {
    if (this.searchTerm.trim() === '') {
      this.getAll();
    } else {
      this.filteredProducts = this.filteredProducts.filter(product =>
        Object.values(product).some(value =>
          String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    }
  }

  sendReview() {
    const user = this.userData[0].name;
    const message = this.postMessage;
    const newReview = { user, message };
    this.diologData.review.push(newReview);
    this.http.put<any>(`https://database-cflh.onrender.com/products/${this.diologData.id}`, this.diologData).subscribe(res => {
      this.postMessage = '';
    });
  }

  slideLeft() {
    this.offsetX += this.slideWidth;
    this.offsetX = Math.min(0, this.offsetX);
  }

  slideRight() {
    this.offsetX -= this.slideWidth;
    this.offsetX = Math.max(-(this.slideWidth * 2), this.offsetX);
  }

  reload() {
    window.location.reload();
  }

  getUserData(): void {
    if (this.email !== null) {
      this.userService.getUserByEmail(this.email)
        .subscribe(data => {
          this.userData = data;
          console.log(this.userData);
          const eventparams = {page:'userdashboard',name: `${data[0].name}`,email: `${data[0].email}`,phoneNo: `${data[0].number}`};
          this.analytics.logEvent('logged',eventparams);
          console.log(`Event 'button_click' logged with parameters`,eventparams);
        });
    }
  } 

  isWishlist() {

  }

  toggleWishlist(id: any) {

  }

  putdatatoReactiveFoem() {
    this.createOrderForm.value.userName = this.userData[0].name;
    this.createOrderForm.value.PID = this.diologData.PID;
    this.createOrderForm.value.phoneNo = this.userData[0].number;
    this.createOrderForm.value.Address = `${this.doorno},${this.street},${this.city}-${this.pincode}`;
    this.createOrderForm.value.productName = this.diologData.Name;
    this.createOrderForm.value.productPrice = this.diologData.Price;
    this.createOrderForm.value.quantity = this.quantity;
    this.createOrderForm.value.grandTotal = this.grandTotal;
  }

  reduceStock() {
    this.diologData.Stock = this.diologData.Stock - this.quantity;
    this.productService.updateProductData(this.diologData.id, this.diologData).subscribe(result => {
      console.log(result);
    });
  }

  createOrder() {
    this.reduceStock();
    this.putdatatoReactiveFoem();
    this.userService.postOrderData(this.createOrderForm.value).subscribe(resp => {
      console.log(resp);

      if (resp) {

        this.openProductDiolog = false;
        this.openPaymentDiolog = false; 
        this.quantity = 1;

        this.resetAddressForm();
      Swal.fire('Hello!', 'This is a SweetAlert2 alert!', 'success');

      }
    })
  }

  resetAddressForm() {
    this.doorno = '';
    this.street = '';
    this.city = '';
    this.pincode = '';
    this.showError = '';
  
  }

  validation() {
    if (this.doorno === '') {
      this.showError = "please enter your Plat / Door No.";
    } else if (this.street === '') {
      this.showError = "Please enter your Street Name";
    } else if (this.city === '') {
      this.showError = "Please enter your City";
    } else if (this.pincode === '') {
      this.showError = "Please enter your Pincode";
    } else if (String(this.pincode).length != 6) {
      this.showError = "Invalid Pincode";
    } else if (this.doorno && this.street && this.city && this.pincode) {
      this.createOrder();
    }
  }

  performPaymentCancel() {
    this.quantity = 1; 
    this.openProductDiolog = false; 
    this.openPaymentDiolog = false; 
    this.showError = "";
    this.showStockIssue = "";
  }
}
