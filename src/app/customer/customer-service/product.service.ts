import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public allProducts: any;
  public products: any;
  public key!: string;
  public product: any;
  public productsData: any;


  constructor(private db: AngularFireDatabase,
    private activatedRoute: ActivatedRoute
  ) {
    this.allProducts = this.db.database.ref('/products');
    // this.getAllProducts();
  }

  // public getAllProducts(): void {
  //   this.allProducts.on('value', (data: any) => {
  //     this.products = Object.keys(data.val()).map(key => {
  //       return {
  //         ...data.val()[key],
  //         push_key: key
  //       }
  //     });
  //   });
  //   return this.products;
  // }


  public getSingleProduct(): void {
    this.key = this.activatedRoute.snapshot.params['id'];
    this.product = this.db.database.ref('/products/' + this.key);
    this.product.on('value', (data: any) => {
      this.productsData = data.val();
    });
    // console.log('this.product', this.productsData);
  }



}
