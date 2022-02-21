import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../customer-service/cart.service';
import { ProductService } from '../customer-service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  public key!: string;
  public product: any;
  public productsData: any;
  public finalProductData: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private db: AngularFireDatabase,
    private cartService: CartService
  ) {


    this.key = this.activatedRoute.snapshot.params['id'];
    this.product = this.db.database.ref('/products/' + this.key);
    this.product.on('value', (data: any) => {
      this.productsData = data.val();
      this.finalProductData = {
        ...this.productsData,
        product_id: this.key,
        qty: 1,
      };
    });
  }

  ngOnInit(): void {
  }

  public addToCart(): void {
    const productArray = {
      ...this.finalProductData,
      finalPrice: this.finalProductData.price * this.finalProductData.qty
    };
    this.cartService.checkProductInCart(this.finalProductData.product_id, productArray);
    // this.cartService.addToCart(productArray);
  }



}
