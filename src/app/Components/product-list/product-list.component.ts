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
    RouterModule
  ]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentPage: number = 1;
  pageSize: number = 12;
  @Output() addToCart = new EventEmitter<Product>();
  @Output() viewProductDetails = new EventEmitter<Product>();

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  onAddToCart(product: Product) {
    this.addToCart.emit(product);
    this.snackBar.open(`${product.name} added to cart!`, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    this.router.navigate(['details/shipping-details']);
  }

  onViewProductDetails(product: Product) {
    this.viewProductDetails.emit(product);
  }

  getRows(products: Product[]): Product[][] {
    const rows = [];
    for (let i = 0; i < products.length; i += 4) {
      rows.push(products.slice(i, i + 4));
    }
    return rows;
  }
}
