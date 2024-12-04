import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../services/cart.service';  // Import the cart service
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BasicDetailsComponent } from '../basic-details/basic-details.component';
import { AdvancedDetailsComponent } from '../advanced-details/advanced-details.component';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSnackBarModule,
    BasicDetailsComponent,
    AdvancedDetailsComponent,
  ],
})
export class StepperComponent implements OnInit, AfterViewInit {
  basicForm: FormGroup;
  advancedForm: FormGroup;
  cartProducts: any[] = []; 
  displayedColumns: string[] = ['image','name', 'price', 'quantity']; 
  router: any;

  constructor(
    private fb: FormBuilder, 
    private snackBar: MatSnackBar, 
    private cartService: CartService 
  ) {
    this.basicForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      dob: [null, [Validators.required]],
    });

    this.advancedForm = this.fb.group({
      occupation: ['', Validators.required],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
    });
  }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items: any) => {
      this.cartProducts = items; 
    });
  }

  ngAfterViewInit(): void {}

  submitAdvancedDetails(stepper: MatStepper) {
    if (this.advancedForm.valid) {
      const advancedDetails = this.advancedForm.value;
      const combinedDetails = {
        name: this.basicForm.get('name')?.value,
        address: this.basicForm.get('address')?.value,
        city: this.basicForm.get('city')?.value,
        dob: this.basicForm.get('dob')?.value,
        occupation: advancedDetails.occupation,
        phoneNumber: advancedDetails.phoneNumber,
      };

      console.log(combinedDetails);
      this.openSnackBar('Advanced Details submitted successfully!', 'Close');
      stepper.next(); 
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 3000 });
  }

  resetStepper(stepper: MatStepper) {
    this.basicForm.reset();
    this.advancedForm.reset();
    this.cartProducts = [];
    stepper.reset();
    this.router.navigate(['/product-list']);
  }

  clearCart() {
    this.cartService.clearCart();  
  }
}
