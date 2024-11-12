import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PaymentMethodDialogComponent } from '../payment-method-dialog/payment-method-dialog.component'; // Import the dialog component
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';  // Import MatSelectModule
import { MatOptionModule } from '@angular/material/core';  // Import MatOptionModule
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { CommonModule } from '@angular/common';  // Import CommonModule for ngIf

@Component({
  selector: 'app-advanced-details',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,  // Add MatSelectModule
    MatOptionModule,  // Add MatOptionModule
    ReactiveFormsModule,  // Add ReactiveFormsModule
    CommonModule  // Add CommonModule (to use *ngIf)
  ],
  templateUrl: './advanced-details.component.html',
})
export class AdvancedDetailsComponent {
  @Output() ngModelChange = new EventEmitter<any>();
  @Input() formGroup!: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    if (!this.formGroup) {
      this.formGroup = this.fb.group({
        occupation: ['', Validators.required],
        phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        paymentMethod: ['', Validators.required],
        googlePayId: [''],
        phonePaymentId: [''],
        creditCardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
        expiryDate: ['', Validators.required],
        cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
      });
    }
  }

  emitDetails() {
    this.ngModelChange.emit(this.formGroup.value);
  }

  selectPaymentMethod(paymentMethod: string) {
    // Open the dialog and pass the selected payment method
    const dialogRef = this.dialog.open(PaymentMethodDialogComponent, {
      width: '400px',  // Adjust dialog width as needed
      data: { paymentMethod }
    });

    // Handle dialog result
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Payment details submitted:', result);
        // Update form values with the submitted data
        if (result.googlePayId) {
          this.formGroup.get('googlePayId')?.setValue(result.googlePayId);
        }
        if (result.phonePaymentId) {
          this.formGroup.get('phonePaymentId')?.setValue(result.phonePaymentId);
        }
        if (result.creditCardNumber) {
          this.formGroup.get('creditCardNumber')?.setValue(result.creditCardNumber);
          this.formGroup.get('expiryDate')?.setValue(result.expiryDate);
          this.formGroup.get('cvv')?.setValue(result.cvv);
        }
      }
    });
  }
}
