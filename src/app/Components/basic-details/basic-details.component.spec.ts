import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { BasicDetailsComponent } from './basic-details.component';
import { DetailsService } from '../../services/details.service';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

class MockDetailsService {
  getDetails() {
    return () => of({ name: 'John Doe', age: 30 });
  }
}

describe('BasicDetailsComponent', () => {
  let component: BasicDetailsComponent;
  let fixture: ComponentFixture<BasicDetailsComponent>;
  let detailsService: DetailsService;
  let formGroup: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BasicDetailsComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        CommonModule
      ],
      providers: [
        { provide: DetailsService, useClass: MockDetailsService },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BasicDetailsComponent);
    component = fixture.componentInstance;
    detailsService = TestBed.inject(DetailsService);
    formGroup = new FormBuilder().group({
      name: [''],
      age: ['']
    });
    component.formGroup = formGroup;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call DetailsService and update basicData', () => {
    expect(component.basicData).toEqual({ name: 'John Doe', age: 30 });
  });

  it('should emit detailsChange when form data changes', () => {
    const emitSpy = spyOn(component.detailsChange, 'emit');
    formGroup.setValue({ name: 'Jane Doe', age: 25 });
    component.ngOnInit();
    fixture.detectChanges();
    expect(emitSpy).toHaveBeenCalledWith({ name: 'Jane Doe', age: 25 });
  });

  it('should subscribe to valueChanges and emit updated form data', () => {
    const emitSpy = spyOn(component.detailsChange, 'emit');
    formGroup.setValue({ name: 'John Smith', age: 40 });
    component.detailsChange.emit(formGroup.value);
    expect(emitSpy).toHaveBeenCalledWith({ name: 'John Smith', age: 40 });
  });
});
