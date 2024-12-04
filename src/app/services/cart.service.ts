import { Injectable } from '@angular/core';
import { Product } from '../Model/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Product[] = []; 
  private cartItemsSubject = new BehaviorSubject<Product[]>(this.cartItems);  

  constructor() {}

  get cartItems$() {
    return this.cartItemsSubject.asObservable();
  }

  addToCart(product: Product) {
    const existingProduct = this.cartItems.find(p => p.id === product.id); 
    if (existingProduct) {
      
      existingProduct.quantity = (existingProduct.quantity || 0) + 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.cartItemsSubject.next(this.cartItems);  
  }

  removeFromCart(product: Product) {
    const index = this.cartItems.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);  
      this.cartItemsSubject.next(this.cartItems);  
    }
  }

  getCartCount(): number {
    return this.cartItems.length;
  }

  
  getCartItems(): Product[] {
    return [...this.cartItems];  
  }

  
  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);  
  }
}
