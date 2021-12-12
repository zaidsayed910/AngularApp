import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { ProductServices } from './product.service';

@Component({
 
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
      pageTitle = 'Product Details';
      errorMessage = '';
      products: IProduct  | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductServices) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += `${id}`; 
    if (id) {
      this.getProduct(id);
      
    }
  }
  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: products => {
         this.products = products;
      },
      error: err => this.errorMessage = err
    });
  }
 


  onBack(): void {
    this.router.navigate(['/product']);
  }

}
