import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../Model/product.model'; 

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getProducts(): Observable<Product[]> {
    const products: Product[] = [
      { id: 1, name: 'Product 1', price: 100, imageUrl: 'https://via.placeholder.com/150' },
      { id: 2, name: 'Product 2', price: 150, imageUrl: 'https://via.placeholder.com/150' },
      { id: 3, name: 'Product 3', price: 200, imageUrl: 'https://via.placeholder.com/150' },
      { id: 4, name: 'Product 4', price: 250, imageUrl: 'https://via.placeholder.com/150' },
      { id: 5, name: 'Product 5', price: 300, imageUrl: 'https://via.placeholder.com/150' },
      // { id: 6, name: 'Product 6', price: 350, imageUrl: 'https://via.placeholder.com/150' },
      // { id: 7, name: 'Product 7', price: 400, imageUrl: 'https://via.placeholder.com/150' },
      // { id: 8, name: 'Product 8', price: 450, imageUrl: 'https://via.placeholder.com/150' },
      // { id: 9, name: 'Product 9', price: 500, imageUrl: 'https://via.placeholder.com/150' },
      // { id: 10, name: 'Product 10', price: 550, imageUrl: 'https://via.placeholder.com/150' },
    ];

    return of(products);
  }
}
