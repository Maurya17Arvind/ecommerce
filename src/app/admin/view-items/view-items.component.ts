import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.scss']
})
export class ViewItemsComponent implements OnInit {

  public products: any;
  public detProduct: any;

  constructor(private db: AngularFireDatabase, private activatedRoute: ActivatedRoute) {
    // this.products = db.list('/products').valueChanges();
    // this.products.subscribe((products: any) => {
    //   this.allProducts = products;
    //   console.log(this.allProducts);
    // })
    let allProducts = this.db.database.ref('/products/');
    allProducts.on('value', (data: any) => {
      // console.log('data.val()', data.val());
      this.products = Object.keys(data.val()).map(key => {
        return {
          ...data.val()[key],
          push_key: key
        }
      });
    });
  }

  ngOnInit(): void {
  }


  public deleteProduct(key: string) {
    this.detProduct = this.db.database.ref('/products/' + key);
    this.detProduct.remove();
  }
}
