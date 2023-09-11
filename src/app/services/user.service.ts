import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../component/userdashboard/userdashboard.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://clothingbotiquesdb.onrender.com/user';
  private OrderUrl = 'clothingbotiquesdb.onrender.com/orders';

  constructor(private http: HttpClient) {}

  getUserByEmail(email: string): Observable<User[]> {
    const url = `${this.apiUrl}?email=${email}`;
    return this.http.get<User[]>(url);
  
}
postOrderData (data: any) {
  return this.http.post<any>(this.OrderUrl,data);
}

getEmployeeData(): Observable<any> {
  return this.http.get<any>(this.OrderUrl);
}

}
