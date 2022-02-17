import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartData: any;
  public orderData: any;
  public fullBillAmount: any;
  public carts: any;
  public filterCustomer: any;

  constructor(private db: AngularFireDatabase) {
    this.orderData = this.db.database.ref('/orders');
    this.cartData = this.db.database.ref('/carts');
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


  public clearCart(): void {
    const customerId = localStorage.getItem('customerId')
    this.cartData.on('value', (data: any) => {
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
