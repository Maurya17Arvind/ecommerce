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
  public customerOrder: any;
  public filterOrder: any;
  public productDetails: any;
  public orderDetails: any;

  constructor(private db: AngularFireDatabase) {
    const cartData = this.db.database.ref('/orders');
    cartData.on('value', (data: any) => {
      this.orders = Object.keys(data?.val() || '').map(key => {
        return {
          ...data.val()[key],
          orderId: key
        }
      });
      this.filterOrder = this.orders.filter((e: any) => e.userId == localStorage.getItem('customerId'))

      this.filterOrder.filter((e: any) => {
        this.productDetails = e.cartValue;
      })
    })
  }

  ngOnInit(): void { }


  public viewDetails(product_id: string): void {
    this.orderDetails = this.productDetails.filter((product: any) => product.product_id == product_id)
    console.log('orderDetails', this.orderDetails)

  }
}
