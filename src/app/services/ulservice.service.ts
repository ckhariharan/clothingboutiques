import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UlserviceService {

  private apiUrl = 'https://clothingbotiquesdb.onrender.com'; // JSON Server URL

  constructor(private http: HttpClient) {}

  register(user: any) {
    return this.http.post(`${this.apiUrl}/user`, user);
  }
}
