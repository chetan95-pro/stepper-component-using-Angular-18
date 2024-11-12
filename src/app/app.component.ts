import { Component } from '@angular/core';
import { LayoutsComponent } from './Components/layouts/layouts.component';
import { StepperComponent } from "./Components/stepper/stepper.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl:'./app.component.css',
  standalone: true,
  imports: [LayoutsComponent, RouterOutlet],
})
export class AppComponent { }
