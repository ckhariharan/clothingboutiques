import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-adminproduct',
  templateUrl: './adminproduct.component.html',
  styleUrls: ['./adminproduct.component.css']
})
export class AdminproductComponent  implements OnInit {

  productList: any[] = [];
  categories: string[] = [];
  selectedCategory: string = 'all';
  filteredProducts: any[] = [];
  searchTerm: string = '';

  constructor(private productService: ProductService, public router: Router,private title:Title) { }

  ngOnInit(): void {
this.title.setTitle('adminproduct');

    if (localStorage.getItem('adminlogin') === null) {
      this.router.navigateByUrl('/adminlogin');
      // The ID of the entry you want to fetch
    }
    this.getAll();
    this.categorizeProducts();
    this.filterProductsByCategory();
}



private categorizeProducts() {
  this.categories = Array.from(new Set(this.productList.map((p) => p.catogory)));

}

getAll() {
  this.productService.getProducts().subscribe((products) => {
    this.productList = products;
    this.categorizeProducts();
    this.filterProductsByCategory();
  });
}


filterProductsByCategory() {
 this.filteredProducts = this.selectedCategory === 'all' ? this.productList : this.productList.filter((product) => product.catogory === this.selectedCategory);
}

mensp() {
 this.filteredProducts =  this.productList.filter((product) => product.catogory === 'MENS');
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





logout() {
  localStorage.removeItem('adminlogin');
  this.router.navigateByUrl('\adminlogin');
}

admindashboard(){
  this.router.navigateByUrl('admindashboard')
}

adminstaff(){
  this.router.navigateByUrl('adminstaff')
}
adminproduct(){
  this.router.navigateByUrl('adminproduct')
}

}
