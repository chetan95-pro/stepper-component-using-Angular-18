import { Component, Input } from '@angular/core';
import { Product } from '../../Model/product.model';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
addToCart(arg0: Product) {

}
  @Input() product: Product | undefined;
 }
