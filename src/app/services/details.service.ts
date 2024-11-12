import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasicDetails, AdvancedDetails } from '../Model/model';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  private apiUrl = 'http://localhost:3000'; // Adjust the URL if needed
  private usesSignal = signal<any>(null);

  constructor(private http: HttpClient) {}

  // Method to get all users
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users`);
  }

  // Method to submit basic and advanced details
  submitDetails(basicDetails: BasicDetails, advancedDetails: AdvancedDetails): Observable<any> {
    const data = {
      ...basicDetails,
      ...advancedDetails
    };
    return this.http.post<any>(`${this.apiUrl}/details`, data);
  }

  getDetails(){
    return this.usesSignal;
  }

  setDetails(user:any){
    this.usesSignal.set(user)
  }
}
