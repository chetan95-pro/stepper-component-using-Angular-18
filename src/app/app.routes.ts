import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepperComponent } from './Components/stepper/stepper.component';
import { ProductListComponent } from './Components/product-list/product-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'product-list', pathMatch: 'full' }, 
  { path: 'product-list', component: ProductListComponent },
  { path: 'stepper', component: StepperComponent },
  { path: '**', redirectTo: 'product-list' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
