import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.scss']
})
export class PendingOrdersComponent implements OnInit {

  public orderDatas: any;
  public orders: any;

  constructor(private db: AngularFireDatabase) {
    const cartData = this.db.database.ref('/orders');
    cartData.on('value', (data: any) => {
      this.orders = Object.keys(data?.val() || '').map(key => {
        return {
          ...data.val()[key],
          orderId: key
        }
      });
    })
  }

  ngOnInit(): void {
  }

  public viewOrder(orderId: any): void {
    const basePath = this.db.database.ref('/orders/' + orderId)
    basePath.on('value', (data: any) => {
      this.orderDatas = data.val().cartValue;
    });
    // this.orderDatas.filter((data: any) => {
    //   console.log('orderData', data)
    // });
  }

}
