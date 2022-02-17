import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public cartData1: any;
  public orders: any;
  public filterOrder: any;
  public productDetails: any;

  constructor(private db: AngularFireDatabase) {
    this.cartData1 = this.db.database.ref('/orders');
  }
  public cartData(): void {
    this.cartData1.on('value', (data: any) => {
      Object.keys(data?.val() || '').map(key => {
        return {
          ...data.val()[key],
          orderId: key
        }
      });
      // this.filterOrder = this.orders.filter((e: any) => e.userId == localStorage.getItem('customerId'))
      // this.filterOrder.filter((e: any) => {
      //   this.productDetails = e.cartValue;
      // });
    });
  }
}
