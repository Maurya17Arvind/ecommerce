import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.scss']
})
export class CustomerHeaderComponent implements OnInit {
  public carts: any;
  public filterCart: any;
  public totalCart!: number;

  constructor(private db: AngularFireDatabase) {
    const cartData = this.db.database.ref('/carts');
    cartData.on('value', (data: any) => {
      this.carts = Object.keys(data?.val() || '').map(key => {
        return {
          ...data.val()[key],
          cartId: key
        }
      });
      this.filterCart = this.carts.filter((e: any) => e.customerID == localStorage.getItem('customerId'));
      this.totalCart = this.filterCart.length;
    });
  }

  ngOnInit(): void {
  }

}
