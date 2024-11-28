import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';  // Import MatDialog
import { CartService } from '../../services/cart.service';
import { Product } from '../../Model/product.model';
import { CartDialogComponent } from '../cart-dialog/cart-dialog.component';  // Import CartDialogComponent

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderComponent implements OnInit {
  cartItems: Product[] = [];
  cartItemCount: number = 0;

  constructor(
    private cartService: CartService, 
    private router: Router, 
    public dialog: MatDialog  // Inject MatDialog
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items: Product[]) => {
      this.cartItems = items ?? [];
      this.cartItemCount = this.cartItems.length;
    });
  }

  // Open Cart Dialog when cart button is clicked
  openCartDialog() {
    const dialogRef = this.dialog.open(CartDialogComponent, {
      width: '400px',  // You can adjust the width here
      data: { items: this.cartItems }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog was closed');
    });
  }

  // Method to navigate to the checkout stepper component
  // goToCheckout() {
  //   if (this.cartItems.length > 0) {
  //     this.router.navigate(['/stepper']);   // Change '/checkout' to your stepper component route
  //   } else {
  //     alert("Your cart is empty!");
  //   }
  // }
}
