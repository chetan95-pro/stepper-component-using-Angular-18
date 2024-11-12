import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-payment-method-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,  // Add MatDialogModule
    MatButtonModule,  // Add MatButtonModule for buttons in dialog
  ],
  templateUrl: './payment-method-dialog.component.html',
  styleUrls: ['./payment-method-dialog.component.css'],
})
export class PaymentMethodDialogComponent {
  paymentForm: FormGroup;
  selectedPaymentMethod: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PaymentMethodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Receive paymentMethod from the parent component
    this.selectedPaymentMethod = data.paymentMethod;

    // Create a form group
    this.paymentForm = this.fb.group({
      googlePayId: [''],
      phonePaymentId: [''],
      creditCardNumber: ['', [Validators.pattern('^[0-9]{16}$')]],
      expiryDate: [''],
      cvv: ['', [Validators.pattern('^[0-9]{3}$')]],
    });
  }
}
