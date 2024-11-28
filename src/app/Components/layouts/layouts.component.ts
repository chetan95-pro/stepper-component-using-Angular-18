import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StepperComponent } from "../stepper/stepper.component";
import { LanguageSelectorComponent } from "../language-selector/language-selector.component";
import { ProductListComponent } from "../product-list/product-list.component";

@Component({
  selector: 'app-layouts',
  standalone: true,
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css'],
  imports: [HeaderComponent, FooterComponent, RouterModule, CommonModule]
})
export class LayoutsComponent {}
