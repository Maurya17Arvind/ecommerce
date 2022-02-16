import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public orders: any;
  public filterOrder: any;
  public addresses: any;
  address: any;
  area: any;
  pinCode: any;

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
        this.addresses = e;
        this.address = e.address;
        this.area = e.area;
        this.pinCode = e.pinCode;
      })
    })
  }

  ngOnInit(): void {
  }

}
