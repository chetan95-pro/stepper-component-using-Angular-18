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
import { ProductListComponent } from '../product-list/product-list.component'; // Import Product List

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
    ProductListComponent,
  ],
})
export class StepperComponent implements OnInit, AfterViewInit {
  basicForm: FormGroup;
  advancedForm: FormGroup;
  records: any[] = [];
  isTableVisible = false;
  submitted = false;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
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

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  onAddToCart(product: any) {
    console.log(`${product.name} added to the cart.`);
  }

  onViewProductDetails(product: any) {
    console.log(`Viewing details for: ${product.name}`);
  }

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

      this.records.push(combinedDetails);
      this.openSnackBar('Advanced Details submitted successfully!', 'Close');
      stepper.next();
    }
  }

  toggleTableVisibility() {
    this.isTableVisible = !this.isTableVisible;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 3000 });
  }

  resetStepper(stepper: MatStepper) {
    this.basicForm.reset();
    this.advancedForm.reset();
    this.records = [];
    this.isTableVisible = false;
    stepper.reset();
  }
  deleteRecord(record: any) {
    const index = this.records.indexOf(record);
    if (index >= 0) {
      this.records.splice(index, 1);
    }
  }
}
