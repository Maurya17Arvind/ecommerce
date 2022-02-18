import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { OrderService } from '../customer-service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public orders: any;
  public filterOrder: any;
  public productDetails: any;
  public orderData: any;
  public orderLength!: number;
  public orderPath: any;

  constructor(private db: AngularFireDatabase, private orderService: OrderService) {
    const cartData = this.db.database.ref('/orders');
    cartData.on('value', (data: any) => {
      this.orders = Object.keys(data?.val() || '').map(key => {
        return {
          ...data.val()[key],
          orderId: key
        }
      });
      this.filterOrder = this.orders.filter((e: any) => e.userId == localStorage.getItem('customerId'));
      this.filterOrder.filter((e: any) => {
        this.productDetails = e.cartValue;
      });
      this.orderLength = this.filterOrder.length;
    });
  }

  ngOnInit(): void { }

  public getOrder(orderId: string): void {
    // console.log('orderId', orderId)
    this.orderPath = this.db.database.ref('/orders/' + orderId);
    this.orderPath.on('value', (data: any) => {
      this.orderData = data.val()?.cartValue || '';
    });
    // console.log('this.orderData.length', this.orderData);
  }

  public cancelOrder(orderId: any): void {
    this.orderPath = this.db.database.ref('/orders/' + orderId);
    this.orderPath.remove();
  }
}
