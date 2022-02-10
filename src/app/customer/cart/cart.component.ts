import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../customer-service/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public carts: any;
  public filterCart: any;
  public qyt: number = 1;
  public idCart: any;
  public detProduct: any;
  tremdata: any;
  public changedCartData: any;
  public ownCartData: any;

  constructor(private productService: ProductService, private db: AngularFireDatabase) {
    const cartData = this.db.database.ref('/carts');
    cartData.on('value', (data: any) => {
      this.carts = Object.keys(data.val()).map(key => {
        return {
          ...data.val()[key],
          cartId: key
        }
      });
      this.filterCart = this.carts.filter((e: any) => e.customerID == localStorage.getItem('customerId'));
      // console.log('this.cart', this.filterCart);
    });
  }
  

  ngOnInit(): void {
    this.getOrderPrice();
  }

public getOrderPrice(): void {
    let orderPrice: any = [];
    this.filterCart.filter((e: any) => {
      orderPrice.push(e.finalPrice);
    });
    this.fullBillAmount = eval(orderPrice.join('+'));
  }
  
  public deleteCart(key: string) {
    this.detProduct = this.db.database.ref('/carts/' + key);
    this.detProduct.remove();
  }

  public changeQty(cartId: string, operation: string): void {
    this.changedCartData = this.filterCart.find(
      (e: any) => e.cartId == cartId
    );
    console.log('this.changedcartData', this.changedCartData);
    const refPath = this.db.database.ref('/carts/' + cartId);

    const commonData = {
      cartId: this.changedCartData.cartId,
      customerID: this.changedCartData.customerID,
      itemName: this.changedCartData.itemName,
      price: this.changedCartData.price,
      product_id: this.changedCartData.product_id,
      returnTime: this.changedCartData.returnTime
    }
    if (operation === 'add') {
      const dataObject = {
        ...commonData,
        finalPrice: this.changedCartData.price * (this.changedCartData.qty + 1),
        qty: this.changedCartData.qty + 1,
      }
      refPath.update(dataObject);
      console.log('dataObject', dataObject)
    }
    else {
      const dataObject = {
        ...commonData,
        finalPrice: this.changedCartData.price * (this.changedCartData.qty - 1),
        qty: this.changedCartData.qty - 1
      }
      refPath.update(dataObject);
      console.log('dataObject', dataObject)
    }

  }
}
