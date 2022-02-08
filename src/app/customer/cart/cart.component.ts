import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ProductService } from '../customer-service/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public carts: any;
  public filterCart: any;

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
      console.log('data', this.filterCart);
    });
  }

  ngOnInit(): void {
  }

}
