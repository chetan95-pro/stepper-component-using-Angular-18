import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CartService } from '../../services/cart.service';
import { Product } from '../../Model/product.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'app-cart-dialog',
  standalone: true,
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.css'],
  imports: [CommonModule, MatButtonModule, MatTableModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CartDialogComponent {
  cartItems: Product[] = [];
  cartItemCount: number = 0;

  // Define columns to display in table
  displayedColumns: string[] = ['image', 'name', 'price', 'quantity', 'availability'];

  constructor(
    private cartService: CartService,
    public dialogRef: MatDialogRef<CartDialogComponent>,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.cartService.cartItems$.subscribe((items: Product[]) => {
      this.cartItems = items ?? [];
      this.cartItemCount = items.length;
    });
  }

  // Close the dialog
  closeDialog(): void {
    this.dialogRef.close();
  }

  // Checkout function with SnackBar instead of alert
  checkout() {
    if (this.cartItems.length > 0) {
      this.router.navigate(['/stepper']);
      this.dialogRef.close();
      console.log('Proceeding to checkout...');
    } else {
      // Show SnackBar instead of alert
      this.snackBar.open('Your cart is empty!', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['snackbar-error'],
      });
    }
  }

  // Calculate the total price of items in the cart
  calculateTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * (item.quantity ?? 0),
      0
    );
  }
}
