import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { AuthAuthenticationService } from 'src/app/auth-authentication.service';
import { ProductService } from '../customer-service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  public key!: string;
  product: any;
  productsData: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private db: AngularFireDatabase
  ) {
    this.key = this.activatedRoute.snapshot.params['id'];
    this.product = this.db.database.ref('/products/' + this.key);
    this.product.on('value', (data: any) => {
      this.productsData = data.val();
    });
  }

  ngOnInit(): void {
  }

  public addToCart(product: any): void {
    const customerID = localStorage.getItem('customerId');
    const cartRef = this.db.database.ref('/carts')
    const data = {
      ...this.productsData,
      customerID: customerID
    }
    cartRef.push(data);
  }
}
