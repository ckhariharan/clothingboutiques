import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { product } from '../component/staffdashboard/staffdashboard.component';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  private ProductUrl = 'https://clothingbotiquesdb.onrender.com/products';   //employee

  getProducts(): Observable<product[]> {
    return this.http.get<any[]>(this.ProductUrl);
  }

  getProductByCatogory(catogory: any): Observable<product[]> {
    const url = `${this.ProductUrl}?catogory=${catogory}`;
    return this.http.get<product[]>(url);
  }

  postProductData(data: product): Observable<product> {
    return this.http.post<product>(this.ProductUrl, data);

  }

  updateProductData(id: any, data: any) {
    return this.http.put(`${this.ProductUrl}/${id}`, data)
  }

  deleteProductData(id: number): Observable<product> {
    const dltUrl = `${this.ProductUrl}/${id}`;
    return this.http.delete<product>(dltUrl);
  }

}
