import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../services/product-service.service';  // Import ProductService
import { Product } from '../../Model/product.model';   // Import Product model
import { CommonModule } from '@angular/common';  // Import CommonModule for ngIf/ngFor
import { MatButtonModule } from '@angular/material/button';  // Import Material Button module
import { MatIconModule } from '@angular/material/icon';  // Import Material Icon module
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';  // Import MatSnackBar
import { Router } from '@angular/router';  // Import Router for navigation

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,    // Import CommonModule for *ngIf and *ngFor
    MatButtonModule, // Import Material Button module
    MatIconModule,   // Import Material Icon module
    MatSnackBarModule, // Import MatSnackBarModule for snackbar toasts
  ]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];  // Store products from the service
  @Output() addToCart = new EventEmitter<Product>();  // Emit event when adding to cart
  @Output() viewProductDetails = new EventEmitter<Product>();  // Emit event when viewing product details

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,  // Inject MatSnackBar service
    private router: Router          // Inject Router service for navigation
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;  // Assign products to the component's products array
    });
  }

  // Emit the selected product to the parent component
  onAddToCart(product: Product) {
    this.addToCart.emit(product);

    // Show toast message
    this.snackBar.open(`${product.name} added to cart!`, 'Close', {
      duration: 3000,  // Duration of the snack bar message
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });

    // Navigate to the Basic Details page after adding to cart
    this.router.navigate(['/basic-details']);  // Replace with your desired route
  }

  // Emit the selected product to view its details
  onViewProductDetails(product: Product) {
    this.viewProductDetails.emit(product);
  }
}
