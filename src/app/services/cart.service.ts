import { Injectable } from '@angular/core';
import { Product } from '../Model/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Product[] = []; // Initial empty cart
  private cartItemsSubject = new BehaviorSubject<Product[]>(this.cartItems);  // Observable to track changes

  constructor() {}

  // Get the current cart items as an observable
  get cartItems$() {
    return this.cartItemsSubject.asObservable();
  }

  // Method to add a product to the cart
  addToCart(product: Product) {
    const existingProduct = this.cartItems.find(p => p.id === product.id); // Check if the product is already in the cart
    if (existingProduct) {
      // Ensure existingProduct.quantity is defined and add 1 to it
      existingProduct.quantity = (existingProduct.quantity || 0) + 1;
    } else {
      // Add new product with quantity 1
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.cartItemsSubject.next(this.cartItems);  // Emit new state to the subscribers
  }

  // Method to remove a product from the cart
  removeFromCart(product: Product) {
    const index = this.cartItems.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);  // Remove product from cart
      this.cartItemsSubject.next(this.cartItems);  // Emit new state to the subscribers
    }
  }

  // Get the current cart count
  getCartCount(): number {
    return this.cartItems.length;
  }

  // Get the current cart items (returns a copy to avoid direct mutation)
  getCartItems(): Product[] {
    return [...this.cartItems];  // Return a copy of the cart items array
  }

  // Clear all items from the cart
  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);  // Emit new state
  }
}
