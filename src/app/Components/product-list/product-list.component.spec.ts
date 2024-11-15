import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product-service.service';
import { Product } from '../../Model/product.model';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

class MockProductService {
  getProducts() {
    return of([
      {
        id: 1,
        name: 'Product 1',
        title: 'Product 1',
        category: 'Category 1',
        price: 100,
        image: 'image1.jpg',
        rating: { rate: 4.5, count: 10 },
      },
      {
        id: 2,
        name: 'Product 2',
        title: 'Product 2',
        category: 'Category 2',
        price: 200,
        image: 'image2.jpg',
        rating: { rate: 4.0, count: 20 },
      },
      {
        id: 3,
        name: 'Product 3',
        title: 'Product 3',
        category: 'Category 3',
        price: 300,
        image: 'image3.jpg',
        rating: { rate: 3.5, count: 30 },
      },
      {
        id: 4,
        name: 'Product 4',
        title: 'Product 4',
        category: 'Category 4',
        price: 400,
        image: 'image4.jpg',
        rating: { rate: 2.5, count: 40 },
      },
      {
        id: 5,
        name: 'Product 5',
        title: 'Product 5',
        category: 'Category 5',
        price: 500,
        image: 'image5.jpg',
        rating: { rate: 4.2, count: 50 },
      },
    ]);
  }
}

class MockMatSnackBar {
  open(message: string, action: string, config: any) {}
}

class MockRouter {
  navigate(commands: any[]) {}
}

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: ProductService;
  let snackBar: MatSnackBar;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductListComponent,
        MatSnackBarModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        RouterModule,
        CommonModule,
      ],
      providers: [
        { provide: ProductService, useClass: MockProductService },
        { provide: MatSnackBar, useClass: MockMatSnackBar },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    snackBar = TestBed.inject(MatSnackBar);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on ngOnInit', () => {
    component.ngOnInit();
    expect(component.products.length).toBe(5);
    expect(component.products[0].name).toBe('Product 1');
    expect(component.products[0].rating.rate).toBe(4.5);
    expect(component.products[0].rating.count).toBe(10);
  });

  it('should emit addToCart event and show snack bar on addToCart', () => {
    const product = {
      id: 1,
      name: 'Product 1',
      title: 'Product 1',
      category: 'Category 1',
      price: 100,
      image: 'image1.jpg',
      rating: { rate: 4.5, count: 10 },
    };
    const addToCartSpy = spyOn(component.addToCart, 'emit');
    const snackBarSpy = spyOn(snackBar, 'open');
    const navigateSpy = spyOn(router, 'navigate');

    component.onAddToCart(product);

    expect(addToCartSpy).toHaveBeenCalledWith(product);
    expect(snackBarSpy).toHaveBeenCalledWith(
      'Product 1 added to cart!',
      'Close',
      {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      }
    );
    expect(navigateSpy).toHaveBeenCalledWith(['details/shipping-details']);
  });

  it('should emit viewProductDetails event on viewProductDetails', () => {
    const product = {
      id: 1,
      name: 'Product 1',
      title: 'Product 1',
      category: 'Category 1',
      price: 100,
      image: 'image1.jpg',
      rating: { rate: 4.5, count: 10 },
    };
    const viewProductDetailsSpy = spyOn(component.viewProductDetails, 'emit');

    component.onViewProductDetails(product);

    expect(viewProductDetailsSpy).toHaveBeenCalledWith(product);
  });

  it('should group products into rows of 4', () => {
    const products: Product[] = [
      {
        id: 1,
        name: 'Product 1',
        title: 'Product 1',
        category: 'Category 1',
        price: 100,
        image: 'image1.jpg',
        rating: { rate: 4.5, count: 10 },
      },
      {
        id: 2,
        name: 'Product 2',
        title: 'Product 2',
        category: 'Category 2',
        price: 200,
        image: 'image2.jpg',
        rating: { rate: 4.0, count: 20 },
      },
      {
        id: 3,
        name: 'Product 3',
        title: 'Product 3',
        category: 'Category 3',
        price: 300,
        image: 'image3.jpg',
        rating: { rate: 3.5, count: 30 },
      },
      {
        id: 4,
        name: 'Product 4',
        title: 'Product 4',
        category: 'Category 4',
        price: 400,
        image: 'image4.jpg',
        rating: { rate: 2.5, count: 40 },
      },
      {
        id: 5,
        name: 'Product 5',
        title: 'Product 5',
        category: 'Category 5',
        price: 500,
        image: 'image5.jpg',
        rating: { rate: 4.2, count: 50 },
      },
      {
        id: 6,
        name: 'Product 6',
        title: 'Product 6',
        category: 'Category 6',
        price: 600,
        image: 'image6.jpg',
        rating: { rate: 4.7, count: 60 },
      },
    ];
    const groupedProducts = component.getRows(products);

    expect(groupedProducts.length).toBe(2);
    expect(groupedProducts[0].length).toBe(4);
    expect(groupedProducts[1].length).toBe(2);
    expect(groupedProducts[0][0].name).toBe('Product 1');
    expect(groupedProducts[1][0].name).toBe('Product 5');
  });
});
