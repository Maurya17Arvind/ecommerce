import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../customer-service/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public carts: any;
  public filterCart: any;
  public qyt: number = 1;
  public idCart: any;

  constructor(private productService: ProductService, private db: AngularFireDatabase) {
    const cartData = this.db.database.ref('/carts');
    cartData.on('value', (data: any) => {
      this.carts = Object.keys(data.val()).map(key => {
        return {
          ...data.val()[key],
          cartId: key
        }
      });
      this.filterCart = this.carts.filter((e: any) => e.customerID == localStorage.getItem('customerId'));
      console.log('this.cart', this.carts[0].cartId);
    });
  }

  ngOnInit(): void {
  }


  public incriment(): void {
    this.idCart = this.carts[0].cartId;
    const cartQyt = this.db.database.ref('/cart' + this.idCart)
    this.qyt = this.qyt + 1;
    // cartQyt.update(this.qyt);
    console.log('this.qyt', this.qyt);
    console.log('first', cartQyt);
  }

  public decriment(): void {
    if (this.qyt === 1) {
      this.qyt;
    } else {
      this.qyt = this.qyt - 1;
    }
  }
}
