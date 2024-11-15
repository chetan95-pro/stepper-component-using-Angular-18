import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AdvancedDetailsComponent } from './advanced-details.component';
import { of } from 'rxjs';
import { PaymentMethodDialogComponent } from '../payment-method-dialog/payment-method-dialog.component';

describe('AdvancedDetailsComponent', () => {
  let component: AdvancedDetailsComponent;
  let fixture: ComponentFixture<AdvancedDetailsComponent>;
  let dialog: MatDialog;

  interface PaymentMethodDialogResult {
    googlePayId?: string;
    phonePaymentId?: string;
    creditCardNumber?: string;
    expiryDate?: string;
    cvv?: string;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedDetailsComponent, ReactiveFormsModule, MatDialogModule],
      providers: [FormBuilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedDetailsComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit form values when emitDetails is called', () => {
    const emitSpy = spyOn(component.ngModelChange, 'emit');
    const formValues = {
      occupation: 'Engineer',
      phoneNumber: '1234567890',
      paymentMethod: 'Credit Card',
      googlePayId: '',
      phonePaymentId: '',
      creditCardNumber: '1234567812345678',
      expiryDate: '12/25',
      cvv: '123'
    };
    component.formGroup.setValue(formValues);
    component.emitDetails();
    expect(emitSpy).toHaveBeenCalledWith(formValues);
  });

  it('should open dialog and update form values on successful dialog result', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    const dialogResult: PaymentMethodDialogResult = {
      googlePayId: 'google123',
      phonePaymentId: 'phone123',
      creditCardNumber: '1234567812345678',
      expiryDate: '12/25',
      cvv: '123'
    };

    dialogRefSpy.afterClosed.and.returnValue(of(dialogResult));
    const openDialogSpy = spyOn(dialog, 'open').and.returnValue(dialogRefSpy);

    component.selectPaymentMethod('Credit Card');
    expect(openDialogSpy).toHaveBeenCalledWith(PaymentMethodDialogComponent, jasmine.objectContaining({
      data: { paymentMethod: 'Credit Card' }
    }));
    
    dialogRefSpy.afterClosed().subscribe((result: PaymentMethodDialogResult) => {
      expect(component.formGroup.get('googlePayId')?.value).toBe(dialogResult.googlePayId);
      expect(component.formGroup.get('phonePaymentId')?.value).toBe(dialogResult.phonePaymentId);
      expect(component.formGroup.get('creditCardNumber')?.value).toBe(dialogResult.creditCardNumber);
      expect(component.formGroup.get('expiryDate')?.value).toBe(dialogResult.expiryDate);
      expect(component.formGroup.get('cvv')?.value).toBe(dialogResult.cvv);
    });
  });

  it('should not update form values if dialog result is null', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(null));
    const openDialogSpy = spyOn(dialog, 'open').and.returnValue(dialogRefSpy);

    component.selectPaymentMethod('Credit Card');
    expect(openDialogSpy).toHaveBeenCalled();
    
    dialogRefSpy.afterClosed().subscribe((result: PaymentMethodDialogResult) => {
      expect(component.formGroup.get('googlePayId')?.value).toBe('');
      expect(component.formGroup.get('phonePaymentId')?.value).toBe('');
      expect(component.formGroup.get('creditCardNumber')?.value).toBe('');
      expect(component.formGroup.get('expiryDate')?.value).toBe('');
      expect(component.formGroup.get('cvv')?.value).toBe('');
    });
  });
});
