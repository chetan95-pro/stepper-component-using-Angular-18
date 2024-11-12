import { Component, EventEmitter, Output, Input, effect } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsService } from '../../services/details.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CommonModule,
    MatError
    
  ]
})
export class BasicDetailsComponent {
  @Output() detailsChange = new EventEmitter<any>();
  basicData : any;
  @Input() formGroup!: FormGroup;

  constructor(private basicSignal: DetailsService){
    effect(() =>{
      this.basicData = this.basicSignal.getDetails()()
    })
  }

  ngOnInit() {
    // this.formGroup.valueChanges.subscribe(value => {
    //   this.detailsChange.emit(value);
  //);
  }
}
