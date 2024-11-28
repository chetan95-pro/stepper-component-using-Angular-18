import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../services/product-service.service';
import { Product } from '../../Model/product.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';  // Import CartService

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule,
    RouterModule,
  ],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentPage: number = 1;
  pageSize: number = 12;
  cartCount: number = 0;  // Variable to store the cart count
  @Output() addToCart = new EventEmitter<Product>();
  @Output() viewProductDetails = new EventEmitter<Product>(); // Declare the event emitter

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router: Router,
    private cartService: CartService  // Inject CartService
  ) {}

  ngOnInit(): void {
    // Subscribe to cart items and update cart count
    this.cartService.cartItems$.subscribe((items) => {
      this.cartCount = items.length;  // Update cart count dynamically
    });

    // Fetch the list of products
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  // Method to add product to cart
  onAddToCart(product: Product) {
    this.cartService.addToCart(product); // Add product to cart via the service
    this.snackBar.open(`${product.name} added to cart!`, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    // Manually trigger cart count update after adding to cart
    this.cartCount = this.cartService.getCartCount();  // Update the cart count
  }

  // Emit event to view product details
  onViewProductDetails(product: Product) {
    this.viewProductDetails.emit(product);  // Emit the product details event
  }

  // Navigate to checkout page
  onProceedToCheckout() {
    this.router.navigate(['/stepper']);
  }

  // Utility to group products into rows (for displaying in a grid)
  getRows(products: Product[]): Product[][] {
    const rows = [];
    for (let i = 0; i < products.length; i += 4) {
      rows.push(products.slice(i, i + 4));
    }
    return rows;
  }
}
