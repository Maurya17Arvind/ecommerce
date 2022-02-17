import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartPath: any;
  public orderData: any;
  public fullBillAmount: any;
  public carts: any;
  public filterCustomer: any;
  public ownCart: any;
  public allCartData: any;
  public updateData: any;


  constructor(private db: AngularFireDatabase) {
    this.orderData = this.db.database.ref('/orders');
    this.cartPath = this.db.database.ref('/carts');

  }


  public addToCart(productDetails: any): void {
    const customerID = localStorage.getItem('customerId');
    const cartRef = this.db.database.ref('/carts')
    const data = {
      ...productDetails,
      customerID: customerID
    }
    cartRef.push(data);
  }

  public allCarts(): void {
    this.cartPath.on('value', (data: any) => {
      this.allCartData = Object.keys(data?.val() || '').map((key) => {
        return {
          ...data.val()[key],
          cartId: key
        }
      })
    })
  }

  public getOwnCart(productid: any): void {
    this.ownCart = this.allCartData?.find((data: any) =>
      data.customerID == localStorage.getItem('customerId')
      && data.product_id == productid
    )
    // console.log('ownCart', this.ownCart)
  }

  public checkProductInCart(productid: any, productArray: any): void {
    this.allCarts();
    this.getOwnCart(productid);
    if (this.ownCart) {
      const basePath = this.db.database.ref('/carts/' + this.ownCart.cartId);
      basePath.on('value', (value: any) => {
        this.updateData = value.val();
        // console.log('value.val()', this.updateData)
      })
      const updateQty = {
        customerID: this.ownCart.customerID,
        finalPrice: this.ownCart.finalPrice,
        itemName: this.ownCart.itemName,
        price: this.ownCart.price,
        product_id: this.ownCart.product_id,
        qty: this.ownCart.qty + 1,
        returnTime: this.ownCart.returnTime
      }
      basePath.update(updateQty);
      const updateFinalPrice = {
        customerID: this.ownCart.customerID,
        finalPrice: this.ownCart.finalPrice * this.updateData.qty,
        itemName: this.ownCart.itemName,
        price: this.ownCart.price,
        product_id: this.ownCart.product_id,
        qty: this.updateData.qty,
        returnTime: this.ownCart.returnTime
      }
      basePath.update(updateFinalPrice);
    }
    else {
      this.addToCart(productArray);
    }

  }
  public getOrdersDetail(): void {
    this.orderData.on('value', (data: any) => {
      Object.keys(data?.val() || '').map(key => {
        return {
          ...data.val()[key],
          orderId: key
        }
      });
    });
  }

  public productDetails(): void {
    this.cartPath.on('value', (data: any) => {
      Object.keys(data?.val() || '').map(key => {
        return {
          ...data.val()[key],
          cartId: key
        }
      });
    });
  }


  public clearCart(): void {
    const customerId = localStorage.getItem('customerId')
    this.cartPath.on('value', (data: any) => {
      const deleteArray = Object.keys(data?.val() || '').map(key => {
        return {
          ...data.val()[key],
          cartId: key
        }
      });
      this.filterCustomer = deleteArray.filter((e: any) => e.customerID == customerId);
      this.filterCustomer.forEach((element: any) => {
        const basePath = this.db.database.ref('/carts/' + element.cartId);
        basePath.remove();
      })
    });
  }
}
