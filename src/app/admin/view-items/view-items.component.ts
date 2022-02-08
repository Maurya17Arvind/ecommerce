import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.scss']
})
export class ViewItemsComponent implements OnInit {

  public products: any;

  constructor(private db: AngularFireDatabase) {
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
      console.log('this.products', this.products);
    });
  }

  ngOnInit(): void {
  }

}
