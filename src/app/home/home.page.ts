import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public isGrid: boolean;
  public products: Array<Product>;
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.isGrid = false;
  }

  ionViewWillEnter() {
    this.products = this.productService.getAllProducts();
    this.products = this.products.filter(product => {
      return product.stok > 0;
    });
  }

  toggleView() {
    this.isGrid = !this.isGrid;
  }
}
