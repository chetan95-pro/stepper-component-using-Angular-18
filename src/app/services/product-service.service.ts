import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Model/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);  
  }

  addProductToCart(product: Product): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart`, product);  
  }
}
