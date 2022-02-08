import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public allProducts: any;
  products: any;
  public key!: string;
  product: any;
  productsData: any;

  constructor(private db: AngularFireDatabase,
    private activatedRoute: ActivatedRoute
  ) {
    this.allProducts = this.db.database.ref('/products/');
  }

  public getAllProducts(): void {
    this.allProducts.on('value', (data: any) => {
      this.products = Object.keys(data.val()).map(key => {
        return {
          ...data.val()[key],
          push_key: key
        }
      });
    });
    return this.products;
  }


  public getSingleProduct(): void {
    this.key = this.activatedRoute.snapshot.params['id'];
    console.log('this.key', this.key);
    this.product = this.db.database.ref('/products/' + this.key);
    this.product.on('value', (data: any) => {
      this.productsData = data.val();
    });
  }


  public addToCart(productDetails: any): void {
    const customerID = localStorage.getItem('customerId');
    const cartRef = this.db.database.ref('/carts')
    const data = {
      ...productDetails,
      customerID: customerID
    }
    cartRef.push(data);
  }
}
