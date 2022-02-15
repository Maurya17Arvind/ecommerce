import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ProductService } from '../customer-service/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public products: any = [];
  public key!: string;
  public product: any;
  public productsData: any;
  public finalProductData: any;

  constructor(
    private productService: ProductService,
    private db: AngularFireDatabase
  ) {
    this.products = this.productService.getAllProducts();
    console.log('this.products', this.products);
  }

  ngOnInit(): void { }

  public addToCart(key: any): void {
    const cart = this.products.find((e: any) => e.push_key = key)
    this.product = this.db.database.ref('/products/' + cart.push_key);
    this.product.on('value', (data: any) => {
      this.productsData = data.val();
      this.finalProductData = {
        ...this.productsData,
        qty: 1,
      };
    });
    const productArray = {
      ...this.finalProductData,
      product_id: cart,
      finalPrice: this.finalProductData.price * this.finalProductData.qty
    };
    this.productService.addToCart(productArray);
  }
}
