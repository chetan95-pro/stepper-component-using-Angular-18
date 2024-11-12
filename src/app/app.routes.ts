import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './Components/layouts/layouts.component'; 
import { StepperComponent } from './Components/stepper/stepper.component'; 

export const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    children: [
      { path: '', redirectTo: 'details', pathMatch: 'full' }, 
      { path: 'details', component: StepperComponent }, 
    ]
  },
  // Optionally, you can add a wildcard route for 404 handling
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirect unknown routes to the home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
