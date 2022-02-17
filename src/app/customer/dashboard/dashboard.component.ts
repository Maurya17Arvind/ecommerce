import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { CartService } from '../customer-service/cart.service';
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
  public cartId: any;
  allProducts: any;

  constructor(
    private productService: ProductService,
    private db: AngularFireDatabase,
    private cartService: CartService
  ) {
    // this.products = this.productService.getAllProducts();
    this.allProducts = this.db.database.ref('/products');
    this.allProducts.on('value', (data: any) => {
      this.products = Object.keys(data.val()).map(key => {
        return {
          ...data.val()[key],
          push_key: key
        }
      });
    });

  }

  ngOnInit(): void { }

  public addToCart(key: any): void {
    this.product = this.db.database.ref('/products/' + key);
    this.product.on('value', (data: any) => {
      this.productsData = data.val();
      this.finalProductData = {
        ...this.productsData,
        qty: 1,
      };
    });
    const productArray = {
      ...this.finalProductData,
      product_id: key,
      finalPrice: this.finalProductData.price * this.finalProductData.qty
    };
    this.cartService.checkProductInCart(productArray.product_id, productArray);
    // this.cartService.addToCart(productArray);
  }



  // public checkProductInCart(): void {
  //   const basePath = this.db.database.ref('/carts');
  //   basePath.on('value', (data: any) => {
  //     const cartData = Object.keys(data.val()).map((key) => {
  //       return {
  //         ...data.val()[key],
  //         cartId: key
  //       }
  //     });
  //     const ownCart = cartData.find((data: any) =>
  //       data.customerID == localStorage.getItem('customerId') && data.product_id == this.cartId.push_key
  //     )

  //     if (!ownCart) {
  //       this.addToCart(data);
  //     }
  //     else {
  //       const basePath = this.db.database.ref('/carts/' + ownCart.cartId);
  //       const data = {
  //         customerID: ownCart.customerID,
  //         finalPrice: ownCart.finalPrice * ownCart.qty,
  //         itemName: ownCart.itemName,
  //         price: ownCart.price,
  //         product_id: ownCart.product_id,
  //         qty: ownCart.qty + 1,
  //         returnTime: ownCart.returnTime
  //       }
  //       basePath.update(data);
  //     }
  //   })

  // }
}
