import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { OrderService } from '../customer-service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public orderDatas: any;
  public orders: any;
  public customerOrder: any;
  public filterOrder: any;
  public productDetails: any;
  public orderDetails: any;
  public orderData: any;

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
    });
  }

  ngOnInit(): void { }

  public getOrder(orderId: string) {
    const orderData = this.db.database.ref('/orders/' + orderId);
    orderData.on('value', (data: any) => {
      this.orderData = data.val().cartValue;
    });
  }

  // public viewDetails(product_id: string): void {
  //   this.orderDetails = this.productDetails.filter((product: any) => product.product_id == product_id)
  //   // console.log('orderDetails', this.orderDetails)

  // }
}
