import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BasicDetailsComponent } from '../basic-details/basic-details.component';
import { AdvancedDetailsComponent } from '../advanced-details/advanced-details.component';
import { RecordTableComponent } from '../record-table/record-table.component';
import { ProductListComponent } from '../product-list/product-list.component';  // Import Product List

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
    BasicDetailsComponent,
    AdvancedDetailsComponent,
    RecordTableComponent,
    ProductListComponent,  // Add ProductListComponent
  ],
})
export class StepperComponent implements OnInit, AfterViewInit {
  basicForm: FormGroup;
  advancedForm: FormGroup;
  records: any[] = [];  // Array to store multiple records
  isTableVisible = false;  // Flag to control table visibility
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.basicForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      dob: [null, [Validators.required]],
    });

    this.advancedForm = this.fb.group({
      occupation: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  // Handle Add to Cart Action
  onAddToCart(product: any) {
    console.log(`${product.name} added to the cart.`);
  }

  // Handle View Product Details Action
  onViewProductDetails(product: any) {
    console.log(`Viewing details for: ${product.name}`);
    // Navigate to product details page or show product details in a modal
  }

  // Handle Step 2 Submit Action (Advanced Details)
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

      // Add the new record to the records array
      this.records.push(combinedDetails);

      // Show success message
      this.openSnackBar('Advanced Details submitted successfully!', 'Close');

      // Move to the next step
      stepper.next();
    }
  }

  // Toggle table visibility
  toggleTableVisibility() {
    this.isTableVisible = !this.isTableVisible;  // Toggle visibility of the table
  }

  // Display Snackbar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 3000 });
  }

  // Reset Stepper
  resetStepper(stepper: MatStepper) {
    this.basicForm.reset();
    this.advancedForm.reset();
    this.records = [];
    this.isTableVisible = false;  // Hide table when reset
    stepper.reset();
  }

  // Delete record from table
  deleteRecord(record: any) {
    const index = this.records.indexOf(record);
    if (index >= 0) {
      this.records.splice(index, 1);
    }
  }
}
