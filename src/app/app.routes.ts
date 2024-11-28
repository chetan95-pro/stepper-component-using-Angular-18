import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepperComponent } from './Components/stepper/stepper.component'; 
import { ProductListComponent } from './Components/product-list/product-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'product-list', pathMatch: 'full' }, // Default route
  { path: 'product-list', component: ProductListComponent },
  { path: 'stepper', component: StepperComponent },
  { path: '**', redirectTo: 'product-list' } // Fallback route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
