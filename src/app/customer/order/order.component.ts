import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

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
      // const filterOrder = this.order.filter((e: any) => {
      //   console.log('e', e)
      // })
      console.log('this.order', this.orders)
    })
  }

  ngOnInit(): void {
  }


  public viewDetails(orderId: any): void {
    const basePath = this.db.database.ref('/orders/' + orderId)
    basePath.on('value', (data: any) => {
      this.orderDatas = data.val().cartValue;
      console.log('data.val()', this.orderDatas);
    });
  }
}
