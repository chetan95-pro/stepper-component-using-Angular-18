import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { Observable, of } from 'rxjs';
=======
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
>>>>>>> 6d4197f9c7f812b1dcabb015692247b13ef9c8dd
import { Product } from '../Model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
<<<<<<< HEAD
  getProducts(): Observable<Product[]> {
    const products: Product[] = [
      {
        id: 1,
        name: 'Product 1',
        price: 100,
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        id: 2,
        name: 'Product 2',
        price: 150,
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        id: 3,
        name: 'Product 3',
        price: 200,
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        id: 4,
        name: 'Product 4',
        price: 250,
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        id: 5,
        name: 'Product 5',
        price: 300,
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        id: 6,
        name: 'Product 6',
        price: 350,
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        id: 7,
        name: 'Product 7',
        price: 400,
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        id: 8,
        name: 'Product 8',
        price: 450,
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        id: 9,
        name: 'Product 9',
        price: 500,
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        id: 10,
        name: 'Product 10',
        price: 550,
        imageUrl: 'https://via.placeholder.com/150',
      },
    ];
=======
  private apiUrl = 'http://localhost:3000/products'; // JSON server URL
>>>>>>> 6d4197f9c7f812b1dcabb015692247b13ef9c8dd

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
