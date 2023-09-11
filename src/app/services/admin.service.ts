import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  employee } from '../component/adminstaff/adminstaff.component';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  FilteredProduct :any[] = [];


  private apiUrl = 'https://clothingbotiquesdb.onrender.com';

  constructor(private http: HttpClient) { }

private EmployeeUrl = 'https://clothingbotiquesdb.onrender.com/employee';   //employee


postEmployeeData(data: employee): Observable<employee> {
  return this.http.post<employee>(this.EmployeeUrl, data);

}

getEmployeeData(): Observable<employee[]> {
  return this.http.get<employee[]>(this.EmployeeUrl)
}

deleteEmployeeData(id: number): Observable<employee> {
  const dltUrl = `${this.EmployeeUrl}/${id}`;
  return this.http.delete<employee>(dltUrl);
}

updateEmployeeData(id: number, data: any) {
  return this.http.put(`${this.EmployeeUrl}/${id}`, data)
}

getEmployeeByEmail(Phone: any): Observable<employee[]> {
  const url = `${this.EmployeeUrl}?Phone=${Phone}`;
  return this.http.get<employee[]>(url);
}

}
